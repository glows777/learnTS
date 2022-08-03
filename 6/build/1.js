"use strict";
function makeCustomer(u) {
    return Object.assign(Object.assign({}, u), { id: u.id, kind: "customer" });
}
