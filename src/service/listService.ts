import { DBQuery } from './dbQuery';

export class ListService extends DBQuery {
  
  constructor() {
    super();
  }

  public async addItem(userId:string, movieList:string[],tvShowList: string[]): Promise<void>{
    await this.addItemsDb(userId,movieList,tvShowList);
  }

  public async removeItem(userId:string, movieList:string[],tvShowList: string[]): Promise<void>{
    await this.removeItemsDb(userId,movieList,tvShowList);
  }

  public async getItems(userId:string): Promise<string[]>{
    return this.getAllDb(userId);
  }

}