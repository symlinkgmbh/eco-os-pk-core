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



import { HttpClient } from "@symlinkde/eco-os-pk-http";
import { PkCore, MsRegistry } from "@symlinkde/eco-os-pk-models";
import { AxiosResponse } from "axios";

export class EcoRegistryClient implements PkCore.IEcoRegistryClient {
  private baseURL: string = "/registry";
  private uri: string;

  public constructor(uri: string) {
    this.uri = uri;
  }

  public addRegistryEntry(object: MsRegistry.IRegistryEntry): Promise<MsRegistry.IRegistryEntry> {
    return new Promise(async (resolve, reject) => {
      const client = await this.resolveClient();
      client
        .getClient()
        .post(`${this.baseURL}`, object)
        .then((entry) => {
          resolve(entry.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async getRegistryEntryById(id: string): Promise<MsRegistry.IRegistryEntry> {
    return new Promise(async (resolve, reject) => {
      const client = await this.resolveClient();
      client
        .getClient()
        .get(`${this.baseURL}/${id}`)
        .then((entry) => {
          resolve(entry.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async getAllRegistryEntries(): Promise<Array<MsRegistry.IRegistryEntry>> {
    return new Promise(async (resolve, reject) => {
      const client = await this.resolveClient();
      client
        .getClient()
        .get(`${this.baseURL}`)
        .then((entry) => {
          resolve(entry.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async getRegistryEntriesByName(name: string): Promise<MsRegistry.IRegistryEntry> {
    return new Promise(async (resolve, reject) => {
      const client = await this.resolveClient();
      client
        .getClient()
        .get(`${this.baseURL}/search/${name}`)
        .then((entry) => {
          resolve(entry.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async updateRegistryEntryById(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const client = await this.resolveClient();
      client
        .getClient()
        .put(`${this.baseURL}/${id}`)
        .then((entry) => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async removeRegistryEntryById(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const client = await this.resolveClient();
      client
        .getClient()
        .delete(`${this.baseURL}/${id}`)
        .then((entry) => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async getRedisConfig(): Promise<AxiosResponse> {
    const client = await this.resolveClient();
    return await client.getClient().get(`${this.baseURL}/config/redis`);
  }

  private async resolveClient(): Promise<HttpClient> {
    return await new HttpClient(this.uri, 10000);
  }
}
