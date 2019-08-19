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



import { EcoRegistryClient } from "../registryService";
import { injectable, inject } from "inversify";
import { Log, LogLevel } from "@symlinkde/eco-os-pk-log";
import { PkCore } from "@symlinkde/eco-os-pk-models";

@injectable()
export class Bootstrapper implements PkCore.IBootstrapper {
  protected selfConfigStore: PkCore.IBootstrapperSignConfig;
  private boostrapperConfig: PkCore.IBootstrapperConfig;
  private registryClient: EcoRegistryClient;

  constructor(@inject("IBootstrapperConfig") config: PkCore.IBootstrapperConfig, uri: string) {
    this.boostrapperConfig = config;
    this.registryClient = new EcoRegistryClient(uri);
    this.selfConfigStore = {
      isRegistered: false,
      registryId: "0",
    };
  }

  public async signInServiceRegistry(): Promise<PkCore.IBootstrapperSignConfig> {
    try {
      const registryCall = await this.registryClient.addRegistryEntry(this.boostrapperConfig);
      this.updateSelfConfigStore(<PkCore.IBootstrapperSignConfig>{ registryId: registryCall.id, isRegistered: true });
      if (registryCall.kubernetes === true) {
        this.initHealthLoop();
      }
      return <PkCore.IBootstrapperSignConfig>{ registryId: registryCall.id, isRegistered: true };
    } catch (err) {
      throw new Error(err);
    }
  }

  public unsignFromServiceRegistryOnProcessTerminate(process: NodeJS.Process): void {
    process.on("SIGINT", () => {
      this.removeFromRegistry();
      return;
    });

    process.on("SIGTERM", () => {
      this.removeFromRegistry();
      return;
    });
  }

  public loadGobalErrorHandler(process: NodeJS.Process): void {
    this.handleGlobaleException(process);
    this.handleRejection(process);
  }

  public async exposeRedisConfig(): Promise<string> {
    const result = await this.registryClient.getRedisConfig();
    if (result.data === undefined || result.data === null) {
      return "";
    }

    return `${result.data.host}:${result.data.port}`;
  }

  private initHealthLoop(): void {
    setInterval(async () => {
      try {
        Log.log("send heartbeat to service registy", LogLevel.info);
        Log.log(
          {
            address: this.boostrapperConfig.address,
            license: this.boostrapperConfig.license,
            name: this.boostrapperConfig.name,
            url: this.boostrapperConfig.name,
            id: this.selfConfigStore.registryId,
          },
          LogLevel.info,
        );

        await this.registryClient.addRegistryEntry({
          address: this.boostrapperConfig.address,
          license: this.boostrapperConfig.license,
          name: this.boostrapperConfig.name,
          url: this.boostrapperConfig.name,
          id: this.selfConfigStore.registryId,
        });
      } catch (err) {
        Log.log(err, LogLevel.error);
      }
    }, 10000);
  }

  private removeFromRegistry(): void {
    if (this.selfConfigStore.isRegistered && this.selfConfigStore.registryId.length > 0) {
      this.registryClient
        .removeRegistryEntryById(this.selfConfigStore.registryId)
        .then(() => {
          process.exit(0);
        })
        .catch(() => {
          process.exit(0);
        });
    }
  }

  private handleRejection(process: NodeJS.Process): void {
    process.on("unhandledRejection", (error) => {
      if (error !== undefined && error !== null) {
        Log.log(error, LogLevel.error);
        return;
      }
    });
  }

  private handleGlobaleException(process: NodeJS.Process): void {
    process.on("uncaughtException", (error) => {
      Log.log(error, LogLevel.error);
    });
  }

  private updateSelfConfigStore(obj: PkCore.IBootstrapperSignConfig): void {
    this.selfConfigStore = obj;
    return;
  }
}
