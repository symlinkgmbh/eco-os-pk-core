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
import { Container, interfaces } from "inversify";
import { PkCore } from "@symlinkde/eco-os-pk-models";
import { Bootstrapper } from "./Bootstrapper";
import { ECO_OS_PK_CORE_TYPES } from "../__types";

const bootstrapperContainer = new Container();
bootstrapperContainer
  .bind<PkCore.IBootstrapper>(ECO_OS_PK_CORE_TYPES.IBootstrapper)
  .toDynamicValue((context: interfaces.Context) => {
    return new Bootstrapper(
      context.container.get(ECO_OS_PK_CORE_TYPES.IBootstrapperConfig),
      context.container.get("SECONDLOCK_REGISTRY_URI"),
    );
  })
  .inSingletonScope();

export { bootstrapperContainer };
