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




import { PkCore } from "@symlinkde/eco-os-pk-models";
import { dynamicClientContainer } from "../dynamicClient";
import { ECO_OS_PK_CORE_TYPES } from "..";
import { AxiosResponse } from "axios";

export class EcoI18nClient implements PkCore.IEcoI18nClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async getLocale(locale: string, delimeter: string | undefined): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-i18n-service");
    if (delimeter) {
      return await client
        .getClient()
        .get("/locale", { headers: { "Accept-Language": locale, "X-Language-Delimeter": delimeter } });
    }
    return await client.getClient().get("/locale", { headers: { "Accept-Language": locale } });
  }

  public async getLocaleEntryByKey(locale: string, key: string, delimeter: string | undefined): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-i18n-service");
    if (delimeter) {
      return await client
        .getClient()
        .get(`/locale/${key}`, { headers: { "Accept-Language": locale, "X-Language-Delimeter": delimeter } });
    }
    return await client.getClient().get(`/locale/${key}`, { headers: { "Accept-Language": locale } });
  }

  public async addLocale(locale: string, key: string, value: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-i18n-service");
    return await client.getClient().post("/locale/manage", { locale, key, value });
  }

  public async updateLocaleById(id: string, locale: string, key: string, value: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-i18n-service");
    return await client.getClient().put(`/locale/manage/${id}`, { locale, key, value });
  }

  public async getLocaleById(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-i18n-service");
    return await client.getClient().get(`/locale/manage/${id}`);
  }

  public async deleteLocaleById(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-i18n-service");
    return await client.getClient().delete(`/locale/manage/${id}`);
  }
}
