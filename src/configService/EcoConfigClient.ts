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



import { dynamicClientContainer } from "../dynamicClient/index";
import { PkCore, MsConf } from "@symlinkde/eco-os-pk-models";
import { AxiosResponse } from "axios";
import { ECO_OS_PK_CORE_TYPES } from "../__types";

export class EcoConfigClient implements PkCore.IEcoConfigClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async set(object: MsConf.IConfigEntry): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-service-config");
    return await client.getClient().post(`/config/`, object);
  }

  public async get(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-service-config");
    return await client.getClient().get(`/config/${id}`);
  }

  public async update(object: MsConf.IConfigEntry): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-service-config");
    return await client.getClient().put(`/config`, object);
  }

  public async delete(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-service-config");
    return await client.getClient().delete(`/config/${id}`);
  }

  public async getAll(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-service-config");
    return await client.getClient().get(`/config`);
  }

  public async deleteAll(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-service-config");
    return await client.getClient().delete(`/config`);
  }
}
