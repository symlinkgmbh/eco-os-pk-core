/**
 * Copyright 2018-2020 Symlink GmbH
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




import { dynamicClientContainer } from "../dynamicClient/index";
import { PkCore } from "@symlinkde/eco-os-pk-models";
import { ECO_OS_PK_CORE_TYPES } from "../__types";
import { AxiosResponse } from "axios";

export class EcoLicenseClient implements PkCore.IEcoLicenseClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async addLicense(license: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-license-service");
    return await client.getClient().post("/licensing", { license });
  }

  public async checkLicense(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-license-service");
    return await client.getClient().get("/licensing/check");
  }

  public async loadLicense(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-license-service");
    return await client.getClient().get("/licensing");
  }

  public async loadLicensePublicKey(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-license-service");
    return await client.getClient().get("/licensing/publickey");
  }

  public async removeLicense(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-license-service");
    return await client.getClient().delete("/licensing");
  }

  public async checkLicenseLight(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-license-service");
    return await client.getClient().get("/licensing/check/light");
  }

  public async getChecksumFromLicense(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-license-service");
    return await client.getClient().get("/licensing/load/checksum");
  }

  public async getPrivateKeyFromLicense(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-license-service");
    return await client.getClient().get("/licensing/load/privatekey");
  }
}
