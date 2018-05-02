import { Component, OnInit, ViewChild } from '@angular/core';
import { RestauranteService } from '../Service/restaurante.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRestaurante } from '../Models/restaurante';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({

    templateUrl: 'app/Components/restaurante.component.html'

})

export class RestauranteComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    restaurantes: IRestaurante[];
    restaurante: IRestaurante;
    msg: string;
    indLoading: boolean = false;
    restauranteFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _restauranteService: RestauranteService) { }

   
    ngOnInit(): void
    {

        this.restauranteFrm = this.fb.group({
            Id: [''],
           RestauranteName: ['', Validators.required],
           PratoName: ['']
        });

        this.LoadRestaurantes();

    }

    LoadRestaurantes(): void
    {
        this.indLoading = true;
        this._restauranteService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(restaurantes => { this.restaurantes = restaurantes; this.indLoading = false; },
            error => this.msg = <any>error);

    }

    addRestaurante()
    {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Adicionar Novo Restaurante";
        this.modalBtnTitle = "Adicionar";
        this.restauranteFrm.reset();
        this.modal.open();
    }

    editRestaurante(id: number)
    {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Editar ";
        this.modalBtnTitle = "Atualizar";
        this.restaurante = this.restaurantes.filter(x => x.Id == id)[0];
        this.restauranteFrm.setValue(this.restaurante);
        this.modal.open();
    }

    deleteRestaurante(id: number)
    {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirmar Exclusão?";
        this.modalBtnTitle = "Excluir";
        this.restaurante = this.restaurantes.filter(x => x.Id == id)[0];
        this.restauranteFrm.setValue(this.restaurante);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.restauranteFrm.enable() : this.restauranteFrm.disable();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._restauranteService.post(Global.BASE_USER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1)
                        {
                            this.msg = "Restaurante Salvo com Sucesso";
                            this.LoadRestaurantes();
                        }
                        else {
                            this.msg = "Erro ao salvar o restaurante!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._restauranteService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) 
                        {
                            this.msg = "Restaurante Atualizado com Sucesso";
                            this.LoadRestaurantes();
                        }
                        else {
                            this.msg = "Erro ao salvar o restaurante"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._restauranteService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Restaurante Excluido com Sucesso";
                            this.LoadRestaurantes();
                        }
                        else {
                            this.msg = "Erro ao Excluir o restaurante!"
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

