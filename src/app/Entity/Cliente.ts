export class Cliente {
	
	sharedKey: string;
    name: string;
    email: string;
    phone: string;
    startDate: Date | null = null;
    endDate: Date | null = null;
	addDate: Date | null = null;
	
	constructor(){
		this.sharedKey = '';
		this.name = '';
		this.email = '';
		this.phone = '';
        this.startDate = null;
        this.endDate = null;
		this.addDate = new Date();
	}
}