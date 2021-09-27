const vuePermisos = new Vue({
    el: "#permisos",
    data:{
        listaPermisos:[],
        listaTiposPermiso:[],
        postObjectPermiso:{
            id: 0,
            nombreEmpleado: "",
            apellidosEmpleado: "",
            fechaPermiso: "",
            tipoPermiso: 0
        },
        putObjectPermiso:{
            id: 0,
            nombreEmpleado: "",
            apellidosEmpleado: "",
            fechaPermiso: "",
            tipoPermiso: 0
        },
        idDelete: null
    },
    methods:{
        getPermisos: async function(){
            this.listaPermisos = await HTTPClient('Permiso', 'GET', null, true);
        },
        getTiposPermiso: async function(){
            this.listaTiposPermiso = await HTTPClient('TipoPermiso', 'GET', null, true);
        },
        getMomentDate: function (fecha) {
            moment.lang('es', {
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
                weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
            }
            );

            return moment(fecha).format('MMMM Do YYYY');
        },
        setDeletePermiso: function(idDelete){
            this.idDelete = idDelete;
        },
        setPutPermiso: function(idPut){
            this.putObjectPermiso = Object.assign({}, this.listaPermisos.find(x => x.id === idPut));
        },
        setPostPermiso: function(){
            this.postObjectPermiso = {
                id: 0,
                nombreEmpleado: "",
                apellidosEmpleado: "",
                fechaPermiso: "",
                tipoPermiso: 1
            };
        },
        deletePermiso: async function(){
            if (this.idDelete !== null && this.idDelete !== undefined)
            {
                var responseDelete = await HTTPClient('Permiso/' + this.idDelete, 'DELETE', null, true);
                await this.getPermisos();
                $('#modalEliminar').modal('hide');
            }
        },
        putPermiso: async function(){
            if (this.putObjectPermiso !== null && this.putObjectPermiso !== undefined)
            {
                var responsePut = await HTTPClient('Permiso', 'PUT', this.putObjectPermiso, true);
                await this.getPermisos();
                $('#modalEdicion').modal('hide');
            }
        },
        postPermiso: async function(){
            if (this.postObjectPermiso !== null && this.postObjectPermiso !== undefined)
            {
                var responsePost = await HTTPClient('Permiso', 'POST', this.postObjectPermiso, true);
                await this.getPermisos();
                $('#modalRegistro').modal('hide');
            }
        }
    },
    created:async function(){
        await this.getPermisos();
        await this.getTiposPermiso();
    }
});