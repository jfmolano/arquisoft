/* ========================================================================
 * Copyright 2014 Arquidalgos
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 Arquidalgos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['model/usuarioModel'], function(usuarioModel) {
    App.Controller._UsuarioController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#usuario').html());
            this.listTemplate = _.template($('#usuarioList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            if(self.postInit){
            	self.postInit(options);
            }
            
            Backbone.on('show-productos-cliente', function() {
               alert("Hola");
            });
        },
         nuevoEvento: function(){
            alert('Nuevo Evento');
            
        },
        create: function() {
//            if (App.Utils.eventExists(this.componentId + '-' +'instead-usuario-create')) {
//                Backbone.trigger(this.componentId + '-' + 'instead-usuario-create', {view: this});
//            } else {
//                Backbone.trigger(this.componentId + '-' + 'pre-usuario-create', {view: this});
//                this.currentUsuarioModel = new this.modelClass({componentId: this.componentId});
//                this._renderEdit();
//                Backbone.trigger(this.componentId + '-' + 'post-usuario-create', {view: this});
//            }
              
                
              FB.login(function(response) {
                console.log('login - '+JSON.stringify(response));
                }, {scope: 'user_friends,user_likes'});
               
             FB.api('/me/likes', function(response) {
                console.log('Likes :'+JSON.stringify(response));
             });
             
             FB.api('/me/feed', function(response) {
                console.log('Feed: '+JSON.stringify(response));
             });
             
             
            
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-usuario-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-usuario-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-usuario-list', {view: this, data: data});
                var self = this;
				if(!this.usuarioModelList){
                 this.usuarioModelList = new this.listModelClass();
				}
                this.usuarioModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-usuario-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'usuario-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-usuario-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-usuario-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-usuario-edit', {view: this, id: id, data: data});
                if (this.usuarioModelList) {
                    this.currentUsuarioModel = this.usuarioModelList.get(id);
                    this.currentUsuarioModel.set('componentId',this.componentId); 
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-usuario-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentUsuarioModel = new this.modelClass({id: id});
                    this.currentUsuarioModel.fetch({
                        data: data,
                        success: function() {
                            self.currentUsuarioModel.set('componentId',self.componentId); 
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-usuario-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'usuario-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-usuario-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-usuario-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-usuario-delete', {view: this, id: id});
                var deleteModel;
                if (this.usuarioModelList) {
                    deleteModel = this.usuarioModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-usuario-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'usuario-delete', view: self, error: error});
                    }
                });
            }
        },
        save: function() {
//            var self = this;
//            var model = $('#' + this.componentId + '-usuarioForm').serializeObject();
//            if (App.Utils.eventExists(this.componentId + '-' +'instead-usuario-save')) {
//                Backbone.trigger(this.componentId + '-' + 'instead-usuario-save', {view: this, model : model});
//            } else {
//                Backbone.trigger(this.componentId + '-' + 'pre-usuario-save', {view: this, model : model});
//                this.currentUsuarioModel.set(model);
//                this.currentUsuarioModel.save({},
//                        {
//                            success: function(model) {
//                                Backbone.trigger(self.componentId + '-' + 'post-usuario-save', {model: self.currentUsuarioModel});
//                            },
//                            error: function(error) {
//                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'usuario-save', view: self, error: error});
//                            }
//                        });
//            }
            console.log('1');
            FB.api('/me/friends', function(response) {
                console.log('2');
                if (response.data) {
                    console.log('3');
                    console.log('Response'+JSON.stringify(response));
                    console.log('Response data'+JSON.stringify(response.data));
                    console.log('Response data type'+JSON.stringify(response.data.valueOf()));
                     console.log('Response data length '+JSON.stringify(response.data.length));
                     console.log('Response data summary '+JSON.stringify(response.summary));
                     
                    
                     
                     var amigos = response.data;
                     var respuesta = '';
                    for (var i = 0; i < amigos.length; i++) {
                        console.log('i: '+i);
                        console.log('amigo all:'+JSON.stringify(amigos[i]))
                        console.log('amigo '+i+' - nombre:'+amigos[i].name)
                        FB.api("/"+amigos[i].id+"/likes",function(res){
                            console.log('Res:'+res);
                            console.log('Res JSON:'+JSON.stringify(res));
                        })
                    }
                    console.log('4');
                } else {
                    console.log('5');
                    console.log('Error al obtener amigos');
                }
            });
            
            FB.api('/me/friendlists', function(response) {
                console.log('2');
                if (response.data) {
                    console.log('3');
                    console.log('Response'+JSON.stringify(response));
                    console.log('Response data'+JSON.stringify(response.data));
                    console.log('Response data type'+JSON.stringify(response.data.valueOf()));
                     console.log('Response data length '+JSON.stringify(response.data.length));
                     console.log('Response data summary '+JSON.stringify(response.summary));
                     
                    
                     
                     var amigos = response.data;
                     var respuesta = '';
                    for (var i = 0; i < amigos.length; i++) {
                        console.log('i: '+i);
                        console.log('amigo all:'+JSON.stringify(amigos[i]))
                        console.log('amigo '+i+' - nombre:'+amigos[i].name)
                        FB.api("/"+amigos[i].id+"/likes",function(res){
                            console.log('Res:'+res);
                            console.log('Res JSON:'+JSON.stringify(res));
                        })
                    }
                    console.log('4');
                } else {
                    console.log('5');
                    console.log('Error al obtener amigos');
                }
            });
        
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({usuarios: self.usuarioModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({usuario: self.currentUsuarioModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				}));
                self.$el.slideDown("fast");
            });
        },
        
    });
    return App.Controller._UsuarioController;
});