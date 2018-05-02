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
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var prato_service_1 = require("../Service/prato.service");
var PratoComponent = /** @class */ (function () {
    function PratoComponent(fb, _pratoService) {
        this.fb = fb;
        this._pratoService = _pratoService;
        this.indLoading = false;
    }
    PratoComponent.prototype.ngOnInit = function () {
        this.pratoFrm = this.fb.group({
            Id: [''],
            PratoName: ['']
        });
        this.LoadPratos();
    };
    PratoComponent.prototype.LoadPratos = function () {
        var _this = this;
        this.indLoading = true;
        this._pratoService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(function (pratos) { _this.pratos = pratos; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    PratoComponent.prototype.addePrato = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Adicionar Novo Prato";
        this.modalBtnTitle = "Adicionar";
        this.pratoFrm.reset();
        this.modal.open();
    };
    PratoComponent.prototype.editePrato = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Editar Prato";
        this.modalBtnTitle = "Atualizar";
        this.prato = this.pratos.filter(function (x) { return x.Id == id; })[0];
        this.pratoFrm.setValue(this.prato);
        this.modal.open();
    };
    PratoComponent.prototype.deletePrato = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirmar Exclusão?";
        this.modalBtnTitle = "Excluir";
        this.prato = this.pratos.filter(function (x) { return x.Id == id; })[0];
        this.pratoFrm.setValue(this.prato);
        this.modal.open();
    };
    PratoComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.pratoFrm.enable() : this.pratoFrm.disable();
    };
    PratoComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._pratoService.post(global_1.Global.BASE_USER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Prato Adiocionado com Sucesso";
                        _this.LoadPratos();
                    }
                    else {
                        _this.msg = "Erro!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._pratoService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Prato Atualizado com Sucesso";
                        _this.LoadPratos();
                    }
                    else {
                        _this.msg = "Erro";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._pratoService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Prato Atualizado com Sucesso.";
                        _this.LoadPratos();
                    }
                    else {
                        _this.msg = "Erro!";
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
    ], PratoComponent.prototype, "modal", void 0);
    PratoComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/prato.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, prato_service_1.PratoService])
    ], PratoComponent);
    return PratoComponent;
}());
exports.PratoComponent = PratoComponent;
//# sourceMappingURL=prato.component.js.map