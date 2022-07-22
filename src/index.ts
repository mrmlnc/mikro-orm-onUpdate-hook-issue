import { MikroORM } from "@mikro-orm/core";
import { FieldEntity } from "./entities/FieldEntity";
import db from './mikro-orm.config';

(async () => {
    const orm = await MikroORM.init({ ...db });

    await orm.getSchemaGenerator().refreshDatabase();

    const entity = orm.em.create(FieldEntity, {
        children: [{}, {}]
    });

    console.dir({
        'entity.counter.before-persist': entity.counter // undefined
    }, { colors: true });

    await orm.em.persistAndFlush(entity);

    console.dir({
        'entity.counter.after-persist': entity.counter // 100
    }, { colors: true });



    orm.em.clear();



    const entity2 = await orm.em.getRepository(FieldEntity).findOneOrFail({ id: entity.id }, {
        populate: true,
    });

    console.dir({
        'entity.counter.before-transactional': entity2.counter // 100
    }, { colors: true });

    await orm.em.transactional(async () => {});

    console.dir({
        'entity.counter.after-transactional': entity2.counter, // 100
    }, { colors: true });

    await orm.close();
})();
