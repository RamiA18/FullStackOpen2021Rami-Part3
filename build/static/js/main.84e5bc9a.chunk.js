(this.webpackJsonpthephonebook = this.webpackJsonpthephonebook || []).push([
  [0],
  {
    39: function (e, t, n) {},
    40: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n(14),
        c = n.n(r),
        a = n(3),
        o = n(1),
        u = n(0),
        i = function (e) {
          var t = e.text;
          return Object(u.jsxs)("h2", { children: [" ", t, " "] });
        },
        s = function (e) {
          return Object(u.jsxs)("div", {
            children: [
              " ",
              "Search Person: ",
              Object(u.jsx)("input", {
                value: e.value,
                onChange: e.handleChange,
              }),
              " ",
            ],
          });
        },
        d = function (e) {
          var t = e.text;
          return Object(u.jsxs)("h3", { children: [" ", t, " "] });
        },
        b = function (e) {
          return Object(u.jsxs)("div", {
            children: [
              Object(u.jsx)(d, { text: e.title }),
              Object(u.jsxs)("form", {
                onSubmit: e.submitAction,
                children: [
                  Object(u.jsxs)("div", {
                    children: [
                      "name:",
                      " ",
                      Object(u.jsx)("input", {
                        value: e.nameValue,
                        onChange: e.nameChangeHandling,
                      }),
                    ],
                  }),
                  Object(u.jsxs)("div", {
                    children: [
                      "number:",
                      " ",
                      Object(u.jsx)("input", {
                        value: e.numberValue,
                        onChange: e.numberChangeHandling,
                      }),
                    ],
                  }),
                  Object(u.jsx)("div", {
                    children: Object(u.jsx)("button", {
                      className: "btn btn-primary btn-small",
                      type: "submit",
                      children: "add",
                    }),
                  }),
                ],
              }),
            ],
          });
        },
        l = function (e) {
          var t = e.onClickEvent,
            n = e.buttonText;
          return Object(u.jsxs)("button", {
            className: "btn btn-warning btn-sm",
            onClick: t,
            children: [" ", n, " "],
          });
        },
        j = function (e) {
          var t = e.name,
            n = (e.id, e.number),
            r = e.onClickFunction;
          return Object(u.jsxs)("p", {
            children: [
              " ",
              t,
              " ",
              n,
              " ",
              Object(u.jsx)(l, { onClickEvent: r, buttonText: "Delete" }),
            ],
          });
        },
        h = function (e) {
          var t = e.title,
            n = e.persons,
            r = e.handleDelete;
          return Object(u.jsxs)("div", {
            children: [
              Object(u.jsx)(d, { text: t }),
              n.map(function (e) {
                return Object(u.jsx)(
                  j,
                  {
                    name: e.name,
                    number: e.number,
                    onClickFunction: function () {
                      return r(e.id, e.name);
                    },
                  },
                  e.id
                );
              }),
            ],
          });
        },
        f = n(4),
        m = n.n(f),
        O = "/api/persons",
        p = function () {
          return m.a.get(O).then(function (e) {
            return e.data;
          });
        },
        x = function (e) {
          return m.a.post(O, e).then(function (e) {
            return e.data;
          });
        },
        g = function (e, t) {
          return m.a.put("".concat(O, "/").concat(e), t).then(function (e) {
            return e.data;
          });
        },
        v = function (e) {
          return m.a.delete("".concat(O, "/").concat(e)).then(function (e) {
            return e.data;
          });
        },
        T = function (e) {
          var t = e.message,
            n = e.messageType,
            r = e.messageText;
          return "" === t
            ? null
            : Object(u.jsx)("div", {
                className:
                  "rejected" === n
                    ? "alert alert-danger"
                    : "alert alert-success",
                children: r,
              });
        },
        y =
          (n(38),
          n(39),
          function () {
            var e = Object(o.useState)([]),
              t = Object(a.a)(e, 2),
              n = t[0],
              r = t[1],
              c = Object(o.useState)(""),
              d = Object(a.a)(c, 2),
              l = d[0],
              j = d[1],
              f = Object(o.useState)(""),
              m = Object(a.a)(f, 2),
              O = m[0],
              y = m[1],
              C = Object(o.useState)(""),
              w = Object(a.a)(C, 2),
              k = w[0],
              S = w[1],
              M = Object(o.useState)(""),
              N = Object(a.a)(M, 2),
              D = N[0],
              E = N[1];
            Object(o.useEffect)(function () {
              p().then(function (e) {
                r(e);
              });
            }, []);
            var H =
              "" === k
                ? n
                : n.filter(function (e) {
                    return e.name.toLowerCase().includes(k.toLowerCase());
                  });
            return Object(u.jsxs)("div", {
              className: "container",
              children: [
                Object(u.jsx)(i, { text: "PhoneBook" }),
                Object(u.jsx)(T, {
                  message: D,
                  messageText: D.errorMessage,
                  messageType: D.errorType,
                }),
                Object(u.jsx)(s, {
                  value: k,
                  handleChange: function (e) {
                    S(e.target.value);
                  },
                }),
                Object(u.jsx)(b, {
                  title: "Add New",
                  submitAction: function (e) {
                    e.preventDefault();
                    var t = { name: l, number: O },
                      c = n.find(function (e) {
                        return e.name === l;
                      });
                    void 0 !== c
                      ? window.confirm(
                          "".concat(
                            l,
                            " is already in the phonebook, do you want to update the information?"
                          )
                        ) &&
                        g(c.id, t)
                          .then(function (e) {
                            r(
                              n.map(function (t) {
                                return t.id === e.id ? e : t;
                              })
                            ),
                              E({
                                errorMessage: "".concat(
                                  l,
                                  " has been modified"
                                ),
                                errorType: "accepted",
                              }),
                              setTimeout(function () {
                                return E("");
                              }, 5e3);
                          })
                          .catch(function (e) {
                            E({
                              errorMessage: "".concat(
                                l,
                                " has been deleted already from the server"
                              ),
                              errorType: "rejected",
                            }),
                              r(
                                n.filter(function (e) {
                                  return e.name !== l;
                                })
                              ),
                              setTimeout(function () {
                                return E("");
                              }, 5e3);
                          })
                      : x(t)
                          .then(function (e) {
                            r(n.concat(e)),
                              E({
                                errorMessage: "".concat(l, " has been added"),
                                errorType: "accepted",
                              }),
                              setTimeout(function () {
                                return E("");
                              }, 5e3);
                          })
                          .catch(function (e) {
                            E({
                              errorMessage: e.response.data.error,
                              errorType: "rejected",
                            }),
                              setTimeout(function () {
                                return E("");
                              }, 5e3);
                          });
                  },
                  nameValue: l,
                  nameChangeHandling: function (e) {
                    j(e.target.value);
                  },
                  numberValue: O,
                  numberChangeHandling: function (e) {
                    y(e.target.value);
                  },
                }),
                Object(u.jsx)(h, {
                  title: "Numbers",
                  persons: H,
                  handleDelete: function (e, t) {
                    window.confirm(
                      "are you sure you want to delete ".concat(t, "?")
                    ) &&
                      v(e).then(function () {
                        r(
                          n.filter(function (t) {
                            return t.id !== e;
                          })
                        ),
                          E({
                            errorMessage: "the person has been deleted",
                            errorType: "rejected",
                          }),
                          setTimeout(function () {
                            return E("");
                          }, 5e3);
                      });
                  },
                }),
              ],
            });
          });
      c.a.render(Object(u.jsx)(y, {}), document.getElementById("root"));
    },
  },
  [[40, 1, 2]],
]);
//# sourceMappingURL=main.84e5bc9a.chunk.js.map
