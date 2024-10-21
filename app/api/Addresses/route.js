import { NextResponse } from "next/server";
import Addresses from "../../(modules)/Addresses";

function isCPF(cpf) {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/igm, '');
  if (
    !cpf ||
    cpf.length != 11 ||
    /^(\d)\1+$/.test(cpf)
  ) {
    return false;
  }
  var soma = 0;
  var resto;
  for (var i = 1; i <= 9; i++) 
    soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11)) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (var i = 1; i <= 10; i++) 
    soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11)) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function isCNPJ(cnpj) {
  if (typeof cnpj !== "string") return false;
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj == '') return false;
  if (cnpj.length != 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;
  var tamanho = cnpj.length - 2
  var numeros = cnpj.substring(0, tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) return false;
  return true;
}

function validateDocument(document) {
  document = document.replace(/[^\d]+/g, '');
  if (document.length === 11) {
    return isCPF(document);
  } else if (document.length === 14) {
    return isCNPJ(document);
  } else {
    return false;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const addressData = body.formData;

    if(!validateDocument(body.formData.cpfCnpj)){
      return NextResponse.json({ message: `O CPF/CNPJ informado é inválido` }, { status: 401 });
    }

    // Validação simples
    const requiredFields = ["firstName", "lastName", "phoneNumber", "zipCode", "address", "number", "neighborhood", "cpfCnpj", "city", "state", "userId"];
    for (const field of requiredFields) {
      if (!addressData[field]) {
        return NextResponse.json({ message: `O campo ${field} é obrigatório.` }, { status: 400 });
      }
    }

    // Criar e salvar o endereço no MongoDB
    const newAddress = new Addresses(addressData);
    await newAddress.save();

    return NextResponse.json({ message: "Endereço criado com sucesso." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao salvar o endereço.", error }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {

    const body = await req.json();
    const idToDelete = body.formData.AddressId;
    console.log(idToDelete)
    const address = await Addresses.findById(idToDelete);
    console.log(address)

    if (!address) {
      return NextResponse.json({ message: "Endereço não encontrado." }, { status: 404 });
    }

    await address.deleteOne();

    return NextResponse.json({ message: "Endereço excluído com sucesso." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao excluir o endereço.", error }, { status: 500 });
  }
}

export async function PUT(req) { 
  try {
    const body = await req.json();
    const newAddress = body.formData.data;

    if (!newAddress || !body.formData.formId) {
      return NextResponse.json({ message: "Dados do endereço inválidos." }, { status: 400 });
    }

    const addressToEdit = await Addresses.findById(body.formData.formId);

    if (!addressToEdit) {
      return NextResponse.json({ message: "Endereço não encontrado." }, { status: 404 });
    }
    // if(!validateDocument(body.formData.cpfCnpj)){
    //   return NextResponse.json({ message: `O CPF/CNPJ informado é inválido` }, { status: 401 });
    // }

    await Addresses.updateOne(
      { _id:body.formData.formId },
      {
        $set: {
          firstName: newAddress.firstName,
          lastName: newAddress.lastName,
          phoneNumber: newAddress.phoneNumber,
          zipCode: newAddress.zipCode,
          address: newAddress.address,
          number: newAddress.number,
          complement: newAddress.complement,
          neighborhood: newAddress.neighborhood,
          cpfCnpj: newAddress.cpfCnpj,
          state: newAddress.state,
          city: newAddress.city, // Adiciona o campo 'city' que estava faltando
        },
      }
    );

    return NextResponse.json({ message: "Endereço editado com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao editar o endereço:", error);
    return NextResponse.json({ message: "Erro ao editar.", error: error.message }, { status: 500 });
  }
}

