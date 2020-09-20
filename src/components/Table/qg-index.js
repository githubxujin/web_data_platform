import qgTable from "./qg-table";
import qgTableColumn from "./qg-table-column";

/* istanbul ignore next */
const components = [
    qgTable,
    qgTableColumn
]

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}


export default {
    install,
    qgTable,
    qgTableColumn
}
