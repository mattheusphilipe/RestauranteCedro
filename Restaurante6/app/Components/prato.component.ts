import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IPrato } from '../Models/prato';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { PratoService } from '../Service/prato.service';


@Component({

    templateUrl: 'app/Components/prato.component.html'

})

export class PratoComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    pratos: IPrato[];
    prato: IPrato;
    msg: string;
    indLoading: boolean = false;
    pratoFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _pratoService: PratoService) { }


    ngOnInit(): void
    {

        this.pratoFrm = this.fb.group({
            Id: [''],            
            PratoName: ['']
        });

        this.LoadPratos();

    }

    LoadPratos(): void
    {
        this.indLoading = true;
        this._pratoService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(pratos => { this.pratos = pratos; this.indLoading = false; },
            error => this.msg = <any>error);

    }

    addPrato()
    {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Adicionar Novo Prato";
        this.modalBtnTitle = "Adicionar";
        this.pratoFrm.reset();
        this.modal.open();
    }

    editPrato(id: number)
    {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Editar Prato";
        this.modalBtnTitle = "Atualizar";
        this.prato = this.pratos.filter(x => x.Id == id)[0];
        this.pratoFrm.setValue(this.prato);
        this.modal.open();
    }

    deletePrato(id: number)
    {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirmar Exclusão?";
        this.modalBtnTitle = "Excluir";
        this.prato = this.pratos.filter(x => x.Id == id)[0];
        this.pratoFrm.setValue(this.prato);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.pratoFrm.enable() : this.pratoFrm.disable();
    }

    onSubmit(formData: any)
    {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._pratoService.post(Global.BASE_USER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Prato Adiocionado com Sucesso";
                            this.LoadPratos();
                        }
                        else {
                            this.msg = "Erro!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._pratoService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Prato Atualizado com Sucesso";
                            this.LoadPratos();
                        }
                        else {
                            this.msg = "Erro"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._pratoService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Prato Atualizado com Sucesso.";
                            this.LoadPratos();
                        }
                        else {
                            this.msg = "Erro!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }
}

