/**
 * Copyright 2018-2019 Symlink GmbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */



import { PkCore, MsContent } from "@symlinkde/eco-os-pk-models";
import { dynamicClientContainer } from "../dynamicClient";
import { ECO_OS_PK_CORE_TYPES } from "..";
import { AxiosResponse } from "axios";

export class EcoFederationClient implements PkCore.IEcoFederationClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async loadRemoteUserPublicKeys(email: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/remote", { email });
  }

  public async validateIncomingFederationRequest(checksum: string, body: object): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/validate", { checksum, body });
  }

  public async getUserKeys(email: string, domain: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/user", { email, domain });
  }

  public async initFederation(domain: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/init", { domain });
  }

  public async postRemoteContent(content: MsContent.IContent): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/content", content);
  }

  public async receiveRemoteContent(content: MsContent.IContent): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/remote/content", content);
  }

  public async postRemoteContentAsCommunity(content: MsContent.IContent): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/content/community", content);
  }

  public async getRemoteContent(checksum: string, domain: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/content/request", { checksum, domain });
  }

  public async deliverRemoteContent(checksum: string, domain: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-federation-service");
    return await client.getClient().post("/federation/remote/deliver", { checksum, domain });
  }
}
