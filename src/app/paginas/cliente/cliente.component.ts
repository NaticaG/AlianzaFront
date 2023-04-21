import { Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/Services/cliente.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/Entity/Cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit{

  name: string = "";
  phone: string = "";
  email: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();
  cliente: Cliente = new Cliente();

  constructor(
    public dialogRef: MatDialogRef<ClienteComponent>,
    private clienteService:ClienteService,
  ){}

  ngOnInit(): void { }

  registrarCliente(){
    this.cliente.name = this.name;
    this.cliente.phone = this.phone;
    this.cliente.email = this.email;
    this.cliente.startDate = this.startDate;
    this.cliente.endDate = this.endDate;

    this.clienteService.crearCliente(this.cliente).subscribe(
      resp=>{
        this.dialogRef.close();
      },
      error=>{
        console.error(error);
      }
    );
  }
}
