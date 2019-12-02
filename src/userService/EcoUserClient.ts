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
import { PkCore, MsUser } from "@symlinkde/eco-os-pk-models";
import { ECO_OS_PK_CORE_TYPES } from "../__types";
import { AxiosResponse } from "axios";
import { IApiKey } from "@symlinkde/eco-os-pk-models/lib/models/services/ms_user/IApiKey";

export class EcoUserClient implements PkCore.IEcoUserClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async loadUserByEmail(email: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/account/email/${email}`);
  }

  public async loadUserById(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/account/${id}`);
  }

  public async createUser(obj: MsUser.ICreateUserModel): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().post("/account", obj);
  }

  public async updateUserById(id: string, obj: MsUser.IUpdateUserModel): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().put(`/account/${id}`, obj);
  }

  public async deleteUserById(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().delete(`/account/${id}`);
  }

  public async loadAllUsers(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get("/account");
  }

  public async sendForgotPasswordRequest(obj: MsUser.IForgotPasswordRequest): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().post("/password/forgot", obj);
  }

  public async sendAndUpdatePassword(obj: MsUser.IForgotPasswordUpdateRequest): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().post("/password/update", obj);
  }

  public async searchUsers(query: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/account/search/${query}`);
  }

  public async importUsers(users: MsUser.IImportRequest): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().post("/import", users);
  }

  public async activeUser(obj: MsUser.ICreateUserModel): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().post(`/account/activation/activate`, obj);
  }

  public async deactivateUser(activationId: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/account/activation/deactivate/${activationId}`);
  }

  public async loadUserByActivationId(activationId: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/account/activation/${activationId}`);
  }

  public async prepareUserForDelete(email: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().post("/account/queue/", { email });
  }

  public async deleteUserByDeleteId(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().delete(`/account/queue/${id}`);
  }

  public async getCountFromActivatedUsers(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get("/account/licensed/count");
  }

  public async verifyActivationId(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/validation/activate/${id}`);
  }

  public async verifyForgotPasswordId(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/validation/forgot/${id}`);
  }

  public async verifyDeleteId(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/validation/delete/${id}`);
  }

  public async addKeyToUser(id: string, apiKey: IApiKey): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().post("/apikeys", {
      id,
      apiKey,
    });
  }

  public async loadUserByApiKey(key: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().get(`/apikeys/${key}`);
  }

  public async removeKeyFromUser(id: string, apiKey: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().post("/apikeys/delete", {
      id,
      apiKey,
    });
  }

  public async removeAllKeysFromUser(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-user-service");
    return await client.getClient().delete(`/apikeys/delete/all/${id}`);
  }
}
