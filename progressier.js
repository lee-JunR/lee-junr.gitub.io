function e(e) {
	try {
		var t = atob(e);
		return JSON.parse(t) || [];
	} catch (e) {
		return [];
	}
}
importScripts("https://progressier.com/myapp/resource-matching.js?v=7i9e");
const t = "false",
	o = "https://progressier.com",
	r = "false",
	a = e(
		"W3sibmFtZSI6IlJlc291cmNlcyB0byBrZWVwIHVwLXRvLWRhdGUiLCJzdHJhdCI6Im50byIsImZpbHRlcnMiOltdfSx7Im5hbWUiOiJGb250IGZpbGVzIiwic3RyYXQiOiJzd3IiLCJmaWx0ZXJzIjpbW3siZmllbGQiOiJtZXRob2QiLCJjb21wYXJhdG9yIjoiPT0iLCJ2YWx1ZSI6IkdFVCJ9XSxbeyJmaWVsZCI6InVybCIsImNvbXBhcmF0b3IiOiIoLT0pIiwidmFsdWUiOiJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tIn0seyJmaWVsZCI6InVybCIsImNvbXBhcmF0b3IiOiIoLT0pIiwidmFsdWUiOiJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tIn0seyJmaWVsZCI6InVybCIsImNvbXBhcmF0b3IiOiIoLSkiLCJ2YWx1ZSI6ImZvbnQtYXdlc29tZSJ9LHsiZmllbGQiOiJ0eXBlIiwiY29tcGFyYXRvciI6Ij09IiwidmFsdWUiOiJmb250In1dXX1d"
	),
	i = e("W10="),
	c = e("W10="),
	s = e("W10="),
	u = e("W10="),
	n = "progressier-cache",
	l = "progressierPostRequests";

function d() {
	var e = t.toLowerCase();
	return t, "true" === e;
}

function f(...e) {
	try {
		"true" === r && console.log(...e);
	} catch (e) {}
}

function h(n) {
	return new Promise(function (t, r) {
		try {
			if (!indexedDB) return null;
			var e = indexedDB.open(n, 1);
			(e.onupgradeneeded = function () {
				try {
					this.result.createObjectStore(n, {
						autoIncrement: !0,
						keyPath: "id",
					});
				} catch (e) {
					f(e);
				}
			}),
				(e.onsuccess = function () {
					try {
						var e = this.result.transaction(n, "readwrite").objectStore(n);
						return t(e);
					} catch (e) {
						f(e);
					}
				});
		} catch (e) {
			return f(e), r();
		}
	});
}

function w(e, t) {
	return new Response(null, {
		status: e,
		statusText: t,
		headers: {
			"cache-control": "no-store",
		},
	});
}

function p(e, t) {
	try {
		return new ResourceMatching().urlsMatch(e, t);
	} catch (e) {
		return !1;
	}
}
async function y() {
	return await caches.open(n);
}
async function g(e, t) {
	try {
		var r;
		t &&
			new URL(e).protocol.includes("http") &&
			((i = t.status), [0, 200, 201, 202, 203, 204, 205, 206].includes(i)) &&
			(!(function (t, e) {
				try {
					if (new URL(t).origin === o) return;
				} catch (e) {}
				e = new ResourceMatching().hasNoStore(e);
				let r = !1;
				return (
					u.forEach(function (e) {
						p(e, t) && (r = !0);
					}),
					!((e && r) || !e)
				);
			})(e, k(t.headers))
				? ((r =
						0 === (n = t).status
							? n.clone()
							: (delete (a = k((n = n.clone()).headers))["cache-control"],
							  new Response(n.body, {
									type: n.type || "default",
									status: n.status,
									statusText: n.statusText,
									headers: a,
							  }))),
				  await (await y()).put(e, r))
				: f(e, "shouldnt store"));
	} catch (e) {
		f(e);
	}
	var n, a, i;
}

function v(t) {
	let r = null,
		n = null;
	if (
		(s.forEach(function (e) {
			r || (p(e.original, t) && ((r = e.fallback), (n = e.original)));
		}),
		!r)
	)
		return null;
	let e = r;
	return (
		(e = n.includes("*")
			? e
			: (function (e, t) {
					try {
						var r,
							n = new URL(e).searchParams,
							a = new URL(t),
							i = a.searchParams;
						for (r of n.entries()) i.get(r[0]) || i.set(r[0], r[1]);
						return a.href;
					} catch (e) {
						f(e);
					}
			  })(t, r)) || r
	);
}
async function m(t) {
	var e;
	let r = {};
	[
		"url",
		"method",
		"referrer",
		"referrerPolicy",
		"mode",
		"credentials",
		"cache",
		"redirect",
		"integrity",
		"destination",
	].forEach(function (e) {
		t[e] && (r[e] = t[e]);
	});
	try {
		t.headers && t.headers.entries
			? (r.headers = k(t.headers))
			: t.headers &&
			  "object" == typeof t.headers &&
			  (r.headers = JSON.parse(JSON.stringify(t.headers))),
			t.body &&
				(r.body = "object" == typeof t.body ? JSON.stringify(t.body) : t.body),
			t.json &&
				(e = await t.json()) &&
				"GET" !== t.method &&
				"HEAD" !== t.method &&
				(r.body = JSON.stringify(e));
	} catch (e) {
		f(e);
	}
	return r;
}
async function b(t, e) {
	var r = t.request,
		n = r.url,
		a = r.clone();
	try {
		var i = t && t.preloadResponse ? await t.preloadResponse : null;
		if (i) return f(t.url, "preload available", i), i;
		var s = await fetch(r, {
			cache: e ? "no-store" : "default",
		});
		if ((f(s, "network res available"), s && s.status && 499 < s.status))
			throw s.statusText || s.status + " Server Error";
		return s;
	} catch (e) {
		if ((f(e), "PUT" === r.method || "POST" === r.method)) {
			t = await (async function (e, t) {
				try {
					var r = v(t);
					if (!r) throw "No fallback URL";
					f("will fetch fallback url", t, r);
					var n = await m(e),
						a = ((n.url = r), new Request(r, n)),
						i = await fetch(a);
					return f("successfully fetched fallback url", t, r, i), i;
				} catch (e) {
					return null;
				}
			})(a, n);
			if (t) return t;
		}
		throw e;
	}
}
async function q(e) {
	var t = await (await y()).match(e.request);
	return (
		t || (e && e.preloadResponse ? await e.preloadResponse : null) || void 0
	);
}
async function P(e) {
	e = v(e);
	return (e && (await (await y()).match(e))) || null;
}
async function R(t) {
	try {
		var e = await b(t, !0);
		return f(t.request.url, "nto retrieved from network", e), e;
	} catch (e) {
		return (
			f(t.request.url, "nto not available from network", e),
			w(503, "The server isn't accessible.")
		);
	}
}
async function S(t) {
	var r = t.request.url;
	try {
		var n = await b(t, !0);
		return await g(r, n), f(r, "ntf available from network and cached", n), n;
	} catch (e) {
		n = await q(t);
		return n
			? (f(r, "ntf fetched from cache", n), n)
			: (await P(r)) ||
					(f(
						r,
						"ntf failed request from network and not available in cache",
						e
					),
					w(
						503,
						"The server isn't accessible and the resource does not exist in cache."
					));
	}
}
async function E(e) {
	var t = e.request.url;
	let r = null;
	try {
		var n = await q(e);
		if (n) {
			if ((f(t, "cfr available in cache", n), 0 !== n.status)) return n;
			f("opaque cached response available cfr", r), (r = n);
		}
		var a = await b(e, !0);
		return (
			await g(e.request.url, a),
			f(t, "cfr retrieved from network and cached", a),
			a
		);
	} catch (e) {
		return r
			? (f("returning cached opaque response cfr", r), r)
			: (await P(t)) ||
					w(
						503,
						"The resource does not exist in cache and the server isn't accessible."
					);
	}
}
async function T(t) {
	try {
		new URL(t.request.url);
		var e = await t.request.formData(),
			r = (function () {
				var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
				let t = "";
				for (var r = 0; r < 7; r++)
					t += e.substr(Math.floor(Math.random() * e.length), 1);
				return t;
			})(),
			n = {
				id: r,
				url: e.get("url") || "",
				title: e.get("title") || "",
				text: e.get("text") || "",
			},
			a = e.get("file") || "",
			i =
				(a &&
					((n.buffer = await a.arrayBuffer()),
					(n.type = a.type),
					(n.filename = a.name)),
				(s = n),
				await new Promise(function (r, t) {
					try {
						let t = "progressiersharedfiles";
						if (!indexedDB) return null;
						var e = indexedDB.open(t, 1);
						(e.onupgradeneeded = function () {
							try {
								this.result.createObjectStore(t, {
									autoIncrement: !0,
									keyPath: "id",
								});
							} catch (e) {
								f(e);
							}
						}),
							(e.onsuccess = function () {
								try {
									var e = this.result
										.transaction(t, "readwrite")
										.objectStore(t);
									return f("storing shared file locally", s), e.add(s), r();
								} catch (e) {
									f(e);
								}
							});
					} catch (e) {
						return f(e), t();
					}
				}),
				new URL(t.request.url));
		return (
			i.searchParams.set("fileid", r),
			i.searchParams.set("url", n.url),
			i.searchParams.set("title", n.title),
			i.searchParams.set("text", n.text),
			Response.redirect(i.href, 303)
		);
	} catch (e) {
		return Response.redirect(t.request.url, 303);
	}
	var s;
}

function x() {
	return new Promise(async function (r, e) {
		let n = !1;
		try {
			setTimeout(function () {
				n || r();
			}, 2e4);
			let t = [];
			return (
				i.forEach(function (e) {
					e = (async function (t) {
						try {
							var e = await fetch(t);
							f("precaching url", t), await g(t, e);
						} catch (e) {
							f(t + " could not be precached");
						}
					})(e);
					t.push(e);
				}),
				await Promise.all(t),
				(n = !0),
				r()
			);
		} catch (e) {
			return f(e), (n = !0), r();
		}
	});
}
async function U(t, e, r) {
	function n() {
		return !(3 <= (t.retries || 0));
	}
	var a = (function (e, t) {
		try {
			var r = new Date(e).getTime();
			return !(60 * t * 60 < (new Date().getTime() - r) / 1e3);
		} catch (e) {
			return !1;
		}
	})(t.date, 24);
	try {
		if (!a || !n()) throw "must delete request from DB";
		var i = await m(t),
			s = (f("processing request now", t.url, i), await fetch(t.url, i));
		if ((f("received response", s), 499 < s.status))
			throw (
				((t.handler = e),
				f(
					"retried request return error " + s.status,
					t.url,
					"will try again later"
				),
				"request resulted in a network error")
			);
		return (await h(l)).delete(t.id), !0;
	} catch (e) {
		try {
			t.retries += 1;
			var o = await h(l);
			n() && a && !r
				? (f("retried requests failed", t.retries + " attempts", t.url),
				  o.put(t))
				: o.delete(t.id);
		} catch (e) {
			f(
				"error accessing indexeddb while updating failed retry request number",
				e
			);
		}
		return !1;
	}
}

function L(i, s) {
	return new Promise(async function (n, a) {
		try {
			let r = [];
			var e = await h(l);
			if (!e || !e.openCursor) return n();
			e.openCursor().onsuccess = async function (e) {
				var t;
				if (!e.target.result)
					return -1 < (t = await Promise.all(r)).indexOf(!1)
						? a(
								"Some indexedBD requests could not be completed. They will automatically be retried later."
						  )
						: (f(t.length + " pending requests processed successfully"), n());
				((t = e.target.result.value || {}).handler && t.handler !== s) ||
					r.push(U(t, s, i)),
					e.target.result.continue();
			};
		} catch (e) {
			return a("Unexpected error processing request in a sync event");
		}
	});
}

function k(e) {
	var t,
		r = {};
	for (t of e.entries()) r[(t[0] || "").toLowerCase()] = t[1];
	return r;
}
async function D(e, t) {
	switch (e) {
		case "swr":
			return (async function (r) {
				let n = null,
					a = r.request.url;
				try {
					var e = await q(r);
					let t = b(r, !0);
					if (
						(r.waitUntil(
							(async function () {
								try {
									var e = await t;
									await g(r.request.url, e), f(a, "swr revalidated", e);
								} catch (e) {}
							})()
						),
						e && 0 === e.status)
					)
						f("cached opaque response available", (n = e));
					else if (e) return f(a, "swr available in cache", e), e;
					var i = await t,
						s = i.clone();
					return f(a, "swr retrieved from network", i), Promise.resolve(s);
				} catch (e) {
					return n
						? (f("returning cached opaque response", n), n)
						: (await P(a)) ||
								w(
									503,
									"The server isn't accessible and the request does not exist in cache"
								);
				}
			})(t);
		case "cfr":
			return E(t);
		case "ntf":
			return S(t);
		case "nto":
			return R(t);
		default:
			return S(t);
	}
}

function O(e) {
	var t = (e.request.headers["content-type"] || "").split(";")[0];
	let r = {
		url: e.request.url,
		method: e.request.method,
		mime: t || "",
		destination: e.request.destination || "",
	};
	t = (function (t) {
		var e = new ResourceMatching().mimes;
		let r = e.findIndex((e) => e.fn(t));
		return (r = r < 0 ? e.length - 1 : r);
	})(r);
	r.mimeIndex = t;
	let n = null;
	return (
		a.forEach(function (e) {
			if (!n) {
				let t = 0;
				e.filters.forEach(function (e) {
					new ResourceMatching().match(r, e) && (t += 1);
				}),
					t < 1 || (t === e.filters.length && (n = e));
			}
		}),
		n ? n.strat : null
	);
}

function B(i) {
	return new Promise(function (a, e) {
		try {
			var t;
			return navigator.setAppBadge
				? indexedDB
					? (((t = indexedDB.open("progressierBadgeDB", 1)).onupgradeneeded =
							function (e) {
								e.target.result
									.createObjectStore("badgeStore", {
										keyPath: "id",
									})
									.add({
										id: "badgeCount",
										count: 0,
									});
							}),
					  (t.onerror = function (e) {
							a();
					  }),
					  void (t.onsuccess = function (e) {
							let t = e.target.result;
							e = t.transaction(["badgeStore"], "readwrite");
							let r = e.objectStore("badgeStore");
							var n = r.get("badgeCount");
							(n.onsuccess = function (e) {
								e = e.target.result;
								let t = e ? e.count : 0;
								i
									? ((t += i), navigator.setAppBadge(t))
									: ((t = 0), navigator.clearAppBadge()),
									r.put({
										id: "badgeCount",
										count: t,
									}),
									a();
							}),
								(n.onerror = function (e) {
									a();
								}),
								(e.oncomplete = function () {
									t.close(), a();
								});
					  }))
					: a()
				: a();
		} catch (e) {
			return a();
		}
	});
}
async function C() {
	try {
		let t = [];
		var e = await self.clients.matchAll({
			type: "window",
		});
		if (e.length < 1) return null;
		e.forEach(function (e) {
			a = e;
			var a,
				e = new Promise(function (t, e) {
					var r = new MessageChannel();
					let n = !1;
					setTimeout(function () {
						if (!n) return t(!1);
					}, 500),
						(r.port1.onmessage = function (e) {
							"yes" === e.data && (n = !0), t(n);
						}),
						a.postMessage("is-this-standalone", [r.port2]);
				});
			t.push(e);
		});
		let r = [];
		(await Promise.all(t)).forEach(function (e) {
			r.push(e ? "yes" : "no");
		});
		var n = r.indexOf("yes");
		return -1 < n ? e[n] : null;
	} catch (e) {
		return null;
	}
}
self.addEventListener("sync", function (e) {
	f("sync event triggered"), e.waitUntil(L(e.lastChance, e.tag));
}),
	self.addEventListener("install", function (e) {
		self.skipWaiting(), e.waitUntil(x());
	}),
	self.addEventListener("fetch", function (e) {
		var t = e.request.url || "",
			r = new URL(t).origin,
			n = self.location.origin,
			a = e.request.method,
			i = e.request.mode,
			s = e.request.cache;
		"POST" === a && t.includes("progressiersharedcontent=true")
			? e.respondWith(T(e))
			: (t.includes("http://") ||
					n !== o ||
					"document" !== e.request.destination ||
					e.respondWith(S(e)),
			  n !== o &&
					r !== o &&
					(t.includes(
						"https://firebasestorage.googleapis.com/v0/b/pwaa-8d87e.appspot.com"
					)
						? (f("responding with cache first for firebase storage url", t),
						  e.respondWith(E(e)))
						: (function (e, t) {
								let r = !1;
								return (
									("POST" !== e && "PUT" !== e) ||
										c.forEach(function (e) {
											p(e, t) && (r = !0);
										}),
									r
								);
						  })(a, e.request.url) && indexedDB
						? (f("auto retry enable", t),
						  e.respondWith(
								(async function (t) {
									var r = t.request.clone();
									try {
										var n = await R(t);
										if (499 < n.status)
											throw n.statusText || "Server error " + n.status;
										return n;
									} catch (e) {
										k(r.headers);
										(t = await m(r)),
											(n =
												((t.date = new Date().toISOString()),
												(t.retries = 0),
												await h(l)));
										return (
											f("request to retry stored in indexdb", t),
											n.add(t),
											w(
												503,
												"The server isn't accessible. The service worker will retry that request later."
											)
										);
									}
								})(e)
						  ))
						: ("POST" !== a && "PUT" !== a) || !v(e.request.url)
						? "GET" !== a ||
						  "websocket" === i ||
						  ("only-if-cached" === s && "same-origin" !== a) ||
						  ((n = O(e)) && e.respondWith(D(n, e)))
						: (f("fallback url mode", t), e.respondWith(R(e)))));
	}),
	self.addEventListener("message", function (e) {
		f(e),
			"reset-badge-count" === e.data
				? e.waitUntil(B(0))
				: e.data &&
				  e.data.msg &&
				  "back-online" === e.data.msg &&
				  e.waitUntil(L(!0, e.data.id));
	}),
	self.addEventListener("push", function (t) {
		if (d()) f("Push received but not handled by Progressier");
		else if (
			self.Notification &&
			"granted" === self.Notification.permission &&
			t.data
		) {
			let e = {};
			try {
				if (!(e = t.data.json()).title) return void f("missing push title");
			} catch (e) {
				return void f("invalid push data");
			}
			t.waitUntil(
				Promise.all([
					self.registration.showNotification(e.title, e),
					B(1),
					(async function (e) {
						try {
							(e.timestamp = new Date().toISOString()),
								(await h("progressierSavedPushNotifications")).add(e);
						} catch (e) {
							f(e);
						}
					})(e),
				])
			);
		}
	}),
	self.addEventListener("notificationclick", function (t) {
		if (d()) f("Notification clicked but not handled by Progressier");
		else {
			let s = t.notification.data,
				o = (t.notification.close(), s.url || s.target_url);
			var e;
			(o =
				t.action &&
				s.actions &&
				0 < s.actions.length &&
				(e = s.actions.find((e) => e.action === t.action)).url
					? e.url
					: o) &&
				(o.startsWith("/") && (o = new URL(self.registration.scope).origin + o),
				t.waitUntil(
					(async function () {
						try {
							var e = await C();
							if (e) {
								e.postMessage({
									msg: "redirect-pwa-from-push",
									url: o,
								});
								try {
									e.focus();
								} catch (e) {
									f(e);
								}
							} else {
								var t = self.registration.scope;
								let e = t;
								t.includes("installable.app") ||
									(!s.starturl && "" !== s.starturl) ||
									(e = new URL(t).origin + "/" + s.starturl);
								var r = (o + "/").includes(t),
									n = btoa(o),
									a = e.includes("?") ? "&" : "?",
									i = r ? o : e + a + "pwaredirect=" + n;
								await clients.openWindow(i);
							}
							await B(0);
						} catch (e) {
							f(e);
						}
					})()
				));
		}
	});
