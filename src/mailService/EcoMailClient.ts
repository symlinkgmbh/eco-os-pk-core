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
import { PkCore, MsMail } from "@symlinkde/eco-os-pk-models";
import { ECO_OS_PK_CORE_TYPES } from "../__types";
import { AxiosResponse } from "axios";

export class EcoMailClient implements PkCore.IEcoMailClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async sendWelcomeMail(mail: MsMail.IMailWelcome): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-mail-service");
    return await client.getClient().post("/mail/welcome", mail);
  }

  public async sendConfirmMail(mail: MsMail.IMailConfirm): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-mail-service");
    return await client.getClient().post("/mail/confirm", mail);
  }

  public async sendDeleteMail(mail: MsMail.IMailDelete): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-mail-service");
    return await client.getClient().post("/mail/delete", mail);
  }

  public async sendForgotMail(mail: MsMail.IMailForgot): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-mail-service");
    return await client.getClient().post("/mail/forgot", mail);
  }

  public async sendActivateAccountMail(mail: MsMail.IMailActivateAccount): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-mail-service");
    return await client.getClient().post("/mail/account/activate", mail);
  }

  public async sendRestPasswordMail(mail: MsMail.IMailResetPassword): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-mail-service");
    return await client.getClient().post("/mail/account/password", mail);
  }

  public async sendDeleteAccountMail(mail: MsMail.IMailDeleteAccount): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-mail-service");
    return await client.getClient().post("/mail/account/password", mail);
  }
}
