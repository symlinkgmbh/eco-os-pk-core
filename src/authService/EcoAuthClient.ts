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
import { MsAuth, PkCore } from "@symlinkde/eco-os-pk-models";
import { AxiosResponse } from "axios";
import { ECO_OS_PK_CORE_TYPES } from "../__types";

export class EcoAuthClient implements PkCore.IEcoAuthClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async authenticate(obj: MsAuth.IAuthenticationRequest): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-auth-service");
    return await client.getClient().post("/authenticate", obj);
  }

  public async authenticateByApiKey(apiKey: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-auth-service");
    return await client.getClient().post("/authenticate/apikey", {
      apiKey,
    });
  }
}
