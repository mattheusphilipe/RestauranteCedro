"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var restaurante_service_1 = require("../Service/restaurante.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var RestauranteComponent = /** @class */ (function () {
    function RestauranteComponent(fb, _restauranteService) {
        this.fb = fb;
        this._restauranteService = _restauranteService;
        this.indLoading = false;
    }
    RestauranteComponent.prototype.ngOnInit = function () {
        this.restauranteFrm = this.fb.group({
            Id: [''],
            RestauranteName: ['', forms_1.Validators.required],
            PratoName: ['']
        });
        this.LoadRestaurantes();
    };
    RestauranteComponent.prototype.LoadRestaurantes = function () {
        var _this = this;
        this.indLoading = true;
        this._restauranteService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(function (restaurantes) { _this.restaurantes = restaurantes; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    RestauranteComponent.prototype.addRestaurante = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Adicionar Novo Restaurante";
        this.modalBtnTitle = "Adicionar";
        this.restauranteFrm.reset();
        this.modal.open();
    };
    RestauranteComponent.prototype.editRestaurante = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Editar ";
        this.modalBtnTitle = "Atualizar";
        this.restaurante = this.restaurantes.filter(function (x) { return x.Id == id; })[0];
        this.restauranteFrm.setValue(this.restaurante);
        this.modal.open();
    };
    RestauranteComponent.prototype.deleteRestaurante = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirmar Exclusão?";
        this.modalBtnTitle = "Excluir";
        this.restaurante = this.restaurantes.filter(function (x) { return x.Id == id; })[0];
        this.restauranteFrm.setValue(this.restaurante);
        this.modal.open();
    };
    RestauranteComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.restauranteFrm.enable() : this.restauranteFrm.disable();
    };
    RestauranteComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._restauranteService.post(global_1.Global.BASE_USER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Restaurante Salvo com Sucesso";
                        _this.LoadRestaurantes();
                    }
                    else {
                        _this.msg = "Erro ao salvar o restaurante!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._restauranteService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Restaurante Atualizado com Sucesso";
                        _this.LoadRestaurantes();
                    }
                    else {
                        _this.msg = "Erro ao salvar o restaurante";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._restauranteService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Restaurante Excluido com Sucesso";
                        _this.LoadRestaurantes();
                    }
                    else {
                        _this.msg = "Erro ao Excluir o restaurante!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], RestauranteComponent.prototype, "modal", void 0);
    RestauranteComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/restaurante.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, restaurante_service_1.RestauranteService])
    ], RestauranteComponent);
    return RestauranteComponent;
}());
exports.RestauranteComponent = RestauranteComponent;
//# sourceMappingURL=restaurante.component.js.map