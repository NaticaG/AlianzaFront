import { Component } from '@angular/core';
import { Cliente } from './Entity/Cliente';
import { ClienteService } from './Services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClienteComponent } from './paginas/cliente/cliente.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alianza';
  sharedKey: string = "";
  listadoClientes: Cliente[] = [];

  displayedColumns: string[] = ['sharedKey','businessId', 'email', 'phone', 'dataAdded', 'editar'];
  matDataSource: any;

  advancedSearch: boolean = false;
  name: string = "";
  phone: string = "";
  email: string = "";
  startDate: Date | null = null;;
  endDate: Date | null = null;;

  constructor(
    private clienteService:ClienteService,
    public dialogo: MatDialog,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void { 
    this.listarClientes();
  }

  listarClientes(){
    this.clienteService.listarClientes().subscribe(
      resp=>{
        this.listadoClientes = resp;
        this.matDataSource = new MatTableDataSource(this.listadoClientes);
      },
      error=>{
        console.error(error);
      }
    );
  }

  crearCliente(){
    this.dialogo.open(ClienteComponent, {
    }).afterClosed().subscribe(
      resp=>{
        this.listarClientes();
      },
      error=>{
        console.error(error);
      }
    );
  }

  buscarCliente(){
    if(this.sharedKey != null && this.sharedKey != ''){
      this.clienteService.buscarCliente(this.sharedKey).subscribe(
        resp=>{

          if(resp != null){
            this.listadoClientes = [];
            this.listadoClientes.push(resp);
            this.matDataSource = new MatTableDataSource(this.listadoClientes);
          }else{
            this.openSnackBar("Client not exist", "Info!")
          }  
            
        },
        error=>{
          console.error(error);
        }
      );
    }else{
      this.openSnackBar("Shared Key necesary!", "Info!")
      this.listarClientes();
    }
  }

  busquedaAvanzada(){
    let cliente: Cliente = new Cliente();
    cliente.name = this.name;
    cliente.phone = this.phone;
    cliente.email = this.email;
    console.log('startDate - ', this.startDate);
    if(this.startDate != null)
      cliente.startDate = this.startDate;
    if(this.endDate != null)
      cliente.endDate = this.endDate;

    this.clienteService.busquedaAvanzada(cliente).subscribe(
      resp=>{
        if(resp != null){
          this.listadoClientes = resp;
          this.matDataSource = new MatTableDataSource(this.listadoClientes);
        }else{
          this.openSnackBar("Client not exist", "Info!")
        }  
          
      },
      error=>{
        console.error(error);
      }
    );
  }

  exportarCliente(){
    const fileName = new Date().getTime() + '.xls';
    this.clienteService.exportarCliente().subscribe(
      response => {
        if(response != null){
          saveAs(response, fileName);
        }
      },
      error => {
        console.log('[generarReporteSolicitudes]error -> ', error);
      }
    );
  }

  showForm(){
    this.advancedSearch = !this.advancedSearch;
  }

  openSnackBar(message: string, state: string) {
    this._snackBar.open(message, state, {
      duration: 2000,
    });
  }

  menuVisible = true;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}
