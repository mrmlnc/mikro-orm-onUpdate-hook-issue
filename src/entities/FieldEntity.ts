import { Collection, Entity, ManyToOne, OneToMany, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";

class WithHooks {
    [OptionalProps]?: 'counter';

    @Property({
        onCreate: () => {
            console.dir({ onCreate: 'call' }, { colors: true });

            return 100;
        },
        onUpdate: () => {
            console.dir({ onUpdate: 'call' }, { colors: true });

            return 200;
        }
    })
    counter: number;
}

@Entity({ tableName: 'field' })
export class FieldEntity extends WithHooks {
    @PrimaryKey({ autoincrement: true })
    id: number;

    @OneToMany(() => ChildEntity, 'field')
    children = new Collection<ChildEntity>(this);
}

@Entity({ tableName: 'child' })
export class ChildEntity extends WithHooks {
    @PrimaryKey({ autoincrement: true })
    id: number;

    @ManyToOne(() => FieldEntity)
    field: FieldEntity;
}
