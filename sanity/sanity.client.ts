import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "uiga1324",
  dataset: "production",
  apiVersion: "2024-02-05",
  useCdn: true,
};

const client = createClient(config);

export default client;
