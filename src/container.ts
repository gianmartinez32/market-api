import 'reflect-metadata';
import { Container } from 'inversify';
import { Database } from '@database/index';
import { PlayerDao } from '@database/dao/player.dao';
import { ProductoDao } from '@database/dao/producto.dao';
import { ContainerValues } from '@interfaces/IContainers';
import { PlayerService } from '@service/api/v1/player/player.service';
import { ProductoService } from '@service/api/v1/producto/producto.service';
import { PlayerController } from '@service/api/v1/player/player.controllers';
import { ProductoController } from '@service/api/v1/producto/producto.controllers';
import { VentaController } from '@service/api/v1/venta/venta.controller';
import { VentaService } from '@service/api/v1/venta/venta.service';
import { VentaDao } from '@database/dao/venta.dao';

const container = new Container();
container.bind<Database>(ContainerValues.DATABASE).to(Database);
container.bind<PlayerController>(PlayerController).toSelf();
container.bind<PlayerService>(ContainerValues.PLAYER_SERVICE).to(PlayerService);
container.bind<PlayerDao>(ContainerValues.PLAYER_DAO).to(PlayerDao);
container.bind<ProductoController>(ProductoController).toSelf();
container.bind<ProductoService>(ContainerValues.PRODUCTO_SERVICE).to(ProductoService);
container.bind<ProductoDao>(ContainerValues.PRODUCTO_DAO).to(ProductoDao);
container.bind<VentaController>(VentaController).toSelf();
container.bind<VentaService>(ContainerValues.VENTA_SERVICE).to(VentaService);
container.bind<VentaDao>(ContainerValues.VENTA_DAO).to(VentaDao);

export default container;
