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



import "reflect-metadata";
import { PkCore } from "@symlinkde/eco-os-pk-models";
import { Container, interfaces } from "inversify";
import { EcoAuthClient } from "./authService";
import { EcoMailClient } from "./mailService";
import { EcoConfigClient } from "./configService";
import { EcoUserClient } from "./userService";
import { EcoContentClient } from "./contentService";
import { ECO_OS_PK_CORE_TYPES } from "./__types";
import { EcoKeyClient } from "./keyService";
import { EcoRegistryClient } from "./registryService";
import { EcoI18nClient } from "./i18nService";
import { EcoIpProtectionClient } from "./ipProtectionService";
import { EcoQueueClient } from "./queueService";
import { EcoMetricsClient } from "./metricsService/EcoMetricsClient";
import { EcoLicenseClient } from "./licenseService/EcoLicenseClient";
import { EcoFederationClient } from "./federationService";

const serviceContainer = new Container();

serviceContainer.bind("SECONDLOCK_REGISTRY_URI").toConstantValue("SECONDLOCK_REGISTRY_URI");
serviceContainer
  .bind<PkCore.IEcoAuthClient>(ECO_OS_PK_CORE_TYPES.IEcoAuthClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoAuthClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  })
  .inSingletonScope();

serviceContainer
  .bind<PkCore.IEcoMailClient>(ECO_OS_PK_CORE_TYPES.IEcoMailClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoMailClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  })
  .inSingletonScope();

serviceContainer
  .bind<PkCore.IEcoConfigClient>(ECO_OS_PK_CORE_TYPES.IEcoConfigClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoConfigClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  })
  .inSingletonScope();

serviceContainer
  .bind<PkCore.IEcoUserClient>(ECO_OS_PK_CORE_TYPES.IEcoUserClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoUserClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  })
  .inSingletonScope();

serviceContainer
  .bind<PkCore.IEcoContentClient>(ECO_OS_PK_CORE_TYPES.IEcoContentClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoContentClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  })
  .inSingletonScope();

serviceContainer
  .bind<PkCore.IEcoKeyClient>(ECO_OS_PK_CORE_TYPES.IEcoKeyClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoKeyClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  })
  .inSingletonScope();

serviceContainer
  .bind<PkCore.IEcoRegistryClient>(ECO_OS_PK_CORE_TYPES.IEcoRegistryClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoRegistryClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  })
  .inSingletonScope();

serviceContainer
  .bind<PkCore.IEcoI18nClient>(ECO_OS_PK_CORE_TYPES.IEcoI18nClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoI18nClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  });

serviceContainer
  .bind<PkCore.IEcoIpProtectionClient>(ECO_OS_PK_CORE_TYPES.IEcoIpProtectionClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoIpProtectionClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  });

serviceContainer
  .bind<PkCore.IEcoQueueClient>(ECO_OS_PK_CORE_TYPES.IEcoQueueClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoQueueClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  });

serviceContainer
  .bind<PkCore.IEcoMetricsClient>(ECO_OS_PK_CORE_TYPES.IEcoMetricsClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoMetricsClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  });

serviceContainer
  .bind<PkCore.IEcoLicenseClient>(ECO_OS_PK_CORE_TYPES.IEcoLicenseClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoLicenseClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  });

serviceContainer
  .bind<PkCore.IEcoFederationClient>(ECO_OS_PK_CORE_TYPES.IEcoFederationClient)
  .toDynamicValue((context: interfaces.Context) => {
    return new EcoFederationClient(context.container.get("SECONDLOCK_REGISTRY_URI"));
  });
export { serviceContainer };
