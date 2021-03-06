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




import { injectable } from "inversify";
import { HttpClient } from "@symlinkde/eco-os-pk-http";
import { EcoRegistryClient } from "../registryService";
import { PkCore } from "@symlinkde/eco-os-pk-models";

@injectable()
class DynamicClient implements PkCore.IDynamicClient {
  private registryClient: EcoRegistryClient;

  public constructor(url: string) {
    this.registryClient = new EcoRegistryClient(url);
  }

  public getClient(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.registryClient
        .getRegistryEntriesByName(name)
        .then((response) => {
          const client = new HttpClient(response.url, 120000);
          resolve(client);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export { DynamicClient };
