import { Request, Response } from 'express';
import VError from 'verror';
import { ListService } from '../service/listService';
import { ProcessedList } from '../models/processedList';


export class listController {
    private listService: ListService;

    constructor() {
        this.listService = new ListService();
    }

    private processList = (itemString: string): ProcessedList => {
        itemString = itemString.replace(/\s/g, '');
        let itemArray:string[] = itemString.split(',');
        let movieList: string[] = [],tvShowList: string[] = [];
        for(const x of itemArray){
            if(x.startsWith('M') && x.length > 1){
                movieList.push(x.substring(1));
            }
            else if(x.startsWith('T') && x.length > 1){
                tvShowList.push(x.substring(1));
            }
            else{
                return {format: false , movieList: [], tvShowList: []};
            }
        }

        return {format: true , movieList, tvShowList};
    }
    
    public addItem = async (request: Request, response: Response): Promise<void> => {
        try{

            let userId:string = (request.body.userId as string) || '';
            let addItems:string = (request.body.items as string) || '';

            let {movieList,tvShowList,format}:ProcessedList = this.processList(addItems);

            if(!(userId && addItems && format)){
                response.status(400).send("Bad Request");
                return;
            }


            await this.listService.addItem(userId,movieList,tvShowList);
            response.status(200).send(JSON.stringify("Succesfully Added to List"));
        }
        catch(err){
            const error: VError = new VError(`ERR in add Item ${(err as any)?.message}`);
            response.status(500).send(error);
        }
    }

    public removeItem = async (request: Request, response: Response): Promise<void> => {
        try{  

            let userId:string = (request.body.userId as string) || '';
            let removeItems:string = (request.body.items as string) || '';

            let {movieList,tvShowList,format}:ProcessedList = this.processList(removeItems);

            if(!(userId && removeItems && format)){
                response.status(400).send("Bad Request");
                return;
            }


            await this.listService.removeItem(userId,movieList,tvShowList);
            response.status(200).send();
        }
        catch(err){
            const error: VError = new VError(`ERR in removing Item ${(err as any)?.message}`);
            response.status(500).send(error);
        }
    }

    public getItems = async (request: Request, response: Response): Promise<void> => {
        try{    
            let userId:string = (request.query.userId as string) || '';

            if(!userId){
                response.status(400).send("Bad request");
                return;
            }
            let res:string[] = await this.listService.getItems(userId);
            if(res.length == 0){
                response.status(404).send("No data");
                return;
            }
            response.status(200).send(res);
        }
        catch(err){
            const error: VError = new VError(`ERR in getItems ${(err as any)?.message}`);
            response.status(500).send(error);
        }
    }

}
