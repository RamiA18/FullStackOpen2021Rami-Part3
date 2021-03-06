(this.webpackJsonpthephonebook = this.webpackJsonpthephonebook || []).push([
  [0],
  {
    39: function (e, n, t) {},
    40: function (e, n, t) {
      "use strict";
      t.r(n);
      var r = t(14),
        c = t.n(r),
        a = t(3),
        o = t(1),
        u = t(0),
        i = function (e) {
          var n = e.text;
          return Object(u.jsxs)("h2", { children: [" ", n, " "] });
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
          var n = e.text;
          return Object(u.jsxs)("h3", { children: [" ", n, " "] });
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
          var n = e.onClickEvent,
            t = e.buttonText;
          return Object(u.jsxs)("button", {
            className: "btn btn-warning btn-sm",
            onClick: n,
            children: [" ", t, " "],
          });
        },
        j = function (e) {
          var n = e.name,
            t = (e.id, e.number),
            r = e.onClickFunction;
          return Object(u.jsxs)("p", {
            children: [
              " ",
              n,
              " ",
              t,
              " ",
              Object(u.jsx)(l, { onClickEvent: r, buttonText: "Delete" }),
            ],
          });
        },
        h = function (e) {
          var n = e.title,
            t = e.persons,
            r = e.handleDelete;
          return Object(u.jsxs)("div", {
            children: [
              Object(u.jsx)(d, { text: n }),
              t.map(function (e) {
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
        f = t(4),
        m = t.n(f),
        O = "/api/persons",
        x = function () {
          return m.a.get(O).then(function (e) {
            return e.data;
          });
        },
        p = function (e) {
          return m.a.post(O, e).then(function (e) {
            return e.data;
          });
        },
        g = function (e, n) {
          return m.a.put("".concat(O, "/").concat(e), n).then(function (e) {
            return e.data;
          });
        },
        v = function (e) {
          return m.a.delete("".concat(O, "/").concat(e)).then(function (e) {
            return e.data;
          });
        },
        C = function (e) {
          var n = e.message,
            t = e.messageType,
            r = e.messageText;
          return "" === n
            ? null
            : Object(u.jsx)("div", {
                className:
                  "rejected" === t
                    ? "alert alert-danger"
                    : "alert alert-success",
                children: r,
              });
        },
        y =
          (t(38),
          t(39),
          function () {
            var e = Object(o.useState)([]),
              n = Object(a.a)(e, 2),
              t = n[0],
              r = n[1],
              c = Object(o.useState)(""),
              d = Object(a.a)(c, 2),
              l = d[0],
              j = d[1],
              f = Object(o.useState)(""),
              m = Object(a.a)(f, 2),
              O = m[0],
              y = m[1],
              w = Object(o.useState)(""),
              T = Object(a.a)(w, 2),
              k = T[0],
              S = T[1],
              N = Object(o.useState)(""),
              E = Object(a.a)(N, 2),
              M = E[0],
              D = E[1];
            Object(o.useEffect)(function () {
              x().then(function (e) {
                r(e);
              });
            }, []),
              Object(o.useEffect)(
                function () {
                  setTimeout(function () {
                    return D("");
                  }, 5e3);
                },
                [M]
              );
            var H =
              "" === k
                ? t
                : t.filter(function (e) {
                    return e.name.toLowerCase().includes(k.toLowerCase());
                  });
            return Object(u.jsxs)("div", {
              className: "container",
              children: [
                Object(u.jsx)(i, { text: "PhoneBook" }),
                Object(u.jsx)(C, {
                  message: M,
                  messageText: M.errorMessage,
                  messageType: M.errorType,
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
                    var n = { name: l, number: O },
                      c = t.find(function (e) {
                        return e.name === l;
                      });
                    void 0 !== c
                      ? window.confirm(
                          "".concat(
                            l,
                            " is already in the phonebook, do you want to update the information?"
                          )
                        ) &&
                        g(c.id, n)
                          .then(function (e) {
                            r(
                              t.map(function (n) {
                                return n.id === e.id ? e : n;
                              })
                            ),
                              D({
                                errorMessage: "".concat(
                                  l,
                                  " has been modified"
                                ),
                                errorType: "accepted",
                              });
                          })
                          .catch(function (e) {
                            D({
                              errorMessage: "".concat(
                                l,
                                " has been deleted already from the server"
                              ),
                              errorType: "rejected",
                            }),
                              r(
                                t.filter(function (e) {
                                  return e.name !== l;
                                })
                              );
                          })
                      : p(n).then(function (e) {
                          r(t.concat(e)),
                            D({
                              errorMessage: "".concat(l, " has been added"),
                              errorType: "accepted",
                            });
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
                  handleDelete: function (e, n) {
                    window.confirm(
                      "are you sure you want to delete ".concat(n, "?")
                    ) &&
                      v(e).then(function () {
                        r(
                          t.filter(function (n) {
                            return n.id !== e;
                          })
                        ),
                          D({
                            errorMessage: "the person has been deleted",
                            errorType: "rejected",
                          });
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
//# sourceMappingURL=main.6d35234d.chunk.js.map
