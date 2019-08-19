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



import { PkCore } from "@symlinkde/eco-os-pk-models";
import { dynamicClientContainer } from "../dynamicClient";
import { ECO_OS_PK_CORE_TYPES } from "../__types";
import { AxiosResponse } from "axios";

export class EcoIpProtectionClient implements PkCore.IEcoIpProtectionClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async add(address: string, deny: boolean): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().post("/protection", { address, deny });
  }

  public async postMetric(address: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().post("/protection/metric", { address });
  }

  public async getMetrics(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().get("/protection/metric");
  }

  public async getEntryById(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().get(`/protection/address/${id}`);
  }

  public async getEntryByIp(address: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().get(`/protection/search/${address}`);
  }

  public async getAllEntries(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().get(`/protection`);
  }

  public async getAllWhitelistEntries(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().get(`/protection/blacklist`);
  }

  public async getAllBlacklistEntries(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().get(`/protection/whitelist`);
  }

  public async updateEntryById(id: string, address: string, deny: boolean): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().put(`/protection/address/${id}`, { address, deny });
  }

  public async extendedIpSearch(address: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().get(`/protection/address/search/${address}`);
  }

  public async deleteEntryById(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().delete(`/protection/address/${id}`);
  }

  public async deleteBlacklist(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().delete(`/protection/blacklist`);
  }

  public async deleteWhitelist(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().delete(`/protection/whitelist`);
  }

  public async processIpAddress(address: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-ip-protection-service");
    return await client.getClient().post("/protection/address/process", { address });
  }
}
