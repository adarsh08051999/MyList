import { EntityManager } from 'typeorm';
import db from '../db';
import MyListData from '../models/myListData';

export class DBQuery {
    protected entityManager!: EntityManager;

    public getAllDb(userId: string): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.connectDb()
                .then(async () => {
                    let temp = await db
                        .getManager()
                        .createQueryBuilder()
                        .select('MyListData')
                        .from(MyListData, 'MyListData')
                        .where('MyListData.userId = :uid', { uid: userId, })
                        .getMany();

                    resolve(temp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    public addItemsDb(userId: string, movieList: string[], tvShowList: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connectDb()
                .then(async () => {

                    // Query to add Item from DB if present
                    await db.getManager().query(`
                    INSERT INTO my_list_data (user_id, movie_list, tv_show_list)
                    VALUES (${userId}, ARRAY[${movieList}]::text[], ARRAY[${tvShowList}]::text[])
                    ON CONFLICT (user_id) DO UPDATE 
                        SET movie_list = (
                            SELECT ARRAY(
                                SELECT DISTINCT unnest(my_list_data.movie_list || ARRAY[${movieList}]::text[])
                            )
                        ),
                        tv_show_list = (
                            SELECT ARRAY(
                                SELECT DISTINCT unnest(my_list_data.tv_show_list || ARRAY[${tvShowList}]::text[])
                            )
                        );
                    `
                    );

                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    public removeItemsDb(userId: string, movieList: string[], tvShowList: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connectDb()
                .then(async () => {

                    const formattedMovieElement = `{${movieList.map(el => `"${el}"`).join(',')}}`;
                    const formattedtvShowElement = `{${tvShowList.map(el => `"${el}"`).join(',')}}`;

                    // Query to remove Item from DB if present
                    await db.getManager().query(`
                    UPDATE my_list_data
                    SET movie_list = array(SELECT unnest(movie_list) EXCEPT SELECT unnest('${formattedMovieElement}'::text[])),
                    tv_show_list = array(SELECT unnest(tv_show_list) EXCEPT SELECT unnest('${formattedtvShowElement}'::text[]))
                    WHERE user_id = '${userId}';
                    `);

                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    protected connectDb = async (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            if (this.entityManager !== undefined && this.entityManager.connection.isConnected) {
                resolve();
                return;
            }
            db.Ready.then(() => {
                this.entityManager = db.getManager();
                resolve();
            }).catch(err => {
                console.log(`While Getting entity manager: ${err.message}`)
                reject(err);
            });
        });
    };

}
