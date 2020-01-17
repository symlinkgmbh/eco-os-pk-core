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




import { dynamicClientContainer } from "../dynamicClient";
import { ECO_OS_PK_CORE_TYPES } from "..";
import { PkCore, MsQueue } from "@symlinkde/eco-os-pk-models";
import { AxiosResponse } from "axios";

export class EcoQueueClient implements PkCore.IEcoQueueClient {
  private dynamicClient: PkCore.IDynamicClient;

  public constructor(SECONDLOCK_REGISTRY_URI: string) {
    dynamicClientContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(SECONDLOCK_REGISTRY_URI);
    this.dynamicClient = dynamicClientContainer.get(ECO_OS_PK_CORE_TYPES.IDynamicClient);
  }

  public async addJob(task: MsQueue.ICreateJob): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-queue-service");
    const jobCreateModel: MsQueue.ICreateJob = {
      job: task.job,
      failover: task.failover,
    };
    return await client.getClient().post("/job", jobCreateModel);
  }

  public async getJob(id: string): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-queue-service");
    return await client.getClient().get(`/job/${id}`);
  }

  public async updateJob(id: string, job: MsQueue.IUpdateJob): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-queue-service");
    return await client.getClient().put(`/job/${id}`, job);
  }

  public async getAllJobs(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-queue-service");
    return await client.getClient().get("/jobs");
  }

  public async getScheduledJobs(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-queue-service");
    return client.getClient().get("/jobs/filter/scheduled");
  }

  public async getProcessingJobs(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-queue-service");
    return client.getClient().get("/jobs/filter/processing");
  }

  public async getCrashedJobs(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-queue-service");
    return client.getClient().get("/jobs/filter/crashed");
  }

  public async getFinishedJobs(): Promise<AxiosResponse> {
    const client = await this.dynamicClient.getClient("eco-os-queue-service");
    return client.getClient().get("/jobs/filter/finished");
  }
}
