! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.DiscordRPC = t() : e.DiscordRPC = t()
}(window, function() {
    return function(e) {
        var t = {};

        function s(i) {
            if (t[i]) return t[i].exports;
            var n = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(n.exports, n, n.exports, s), n.l = !0, n.exports
        }
        return s.m = e, s.c = t, s.d = function(e, t, i) {
            s.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }, s.r = function(e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, s.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return s.d(t, "a", t), t
        }, s.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, s.p = "", s(s.s = 96)
    }([function(e, t, s) {
        e.exports = s(89)
    }, function(e, t, s) {
        e.exports = s(41), e.exports.Messages = s(95)
    }, function(e, t, s) {
        const i = s(21),
            {
                Colors: n,
                DefaultOptions: r,
                Endpoints: o
            } = s(3),
            {
                Error: a,
                RangeError: c,
                TypeError: l
            } = s(1),
            h = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
            u = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;
        class d {
            constructor() {
                throw new Error(`The ${this.constructor.name} class may not be instantiated.`)
            }
            static flatten(e, ...t) {
                const i = e => "object" == typeof e && null !== e;
                if (!i(e)) return e;
                t = Object.assign(...Object.keys(e).filter(e => !e.startsWith("_")).map(e => ({
                    [e]: !0
                })), ...t);
                const n = {};
                for (let [r, o] of Object.entries(t)) {
                    if (!o) continue;
                    o = !0 === o ? r : o;
                    const t = e[r],
                        a = i(t),
                        c = a && "function" == typeof t.valueOf ? t.valueOf() : null;
                    t instanceof s(4) ? n[o] = Array.from(t.keys()) : Array.isArray(t) ? n[o] = t.map(e => d.flatten(e)) : c && !i(c) ? n[o] = c : a || (n[o] = t)
                }
                return n
            }
            static splitMessage(e, {
                maxLength: t = 2e3,
                char: s = "\n",
                prepend: i = "",
                append: n = ""
            } = {}) {
                if (e.length <= t) return e;
                const r = e.split(s);
                if (1 === r.length) throw new c("SPLIT_MAX_LEN");
                const o = [];
                let a = "";
                for (const e of r) a && (a + s + e + n).length > t && (o.push(a + n), a = i), a += (a && a !== i ? s : "") + e;
                return o.concat(a).filter(e => e)
            }
            static escapeMarkdown(e, t = !1, s = !1) {
                return t ? e.replace(/```/g, "`​``") : s ? e.replace(/\\(`|\\)/g, "$1").replace(/(`|\\)/g, "\\$1") : e.replace(/\\(\*|_|`|~|\\)/g, "$1").replace(/(\*|_|`|~|\\)/g, "\\$1")
            }
            static fetchRecommendedShards(e, t = 1e3) {
                return new Promise((s, n) => {
                    if (!e) throw new a("TOKEN_MISSING");
                    i.get(`${r.http.api}/v${r.http.version}${o.botGateway}`).set("Authorization", `Bot ${e.replace(/^Bot\s*/i,"")}`).end((e, i) => {
                        e && n(e), s(i.body.shards * (1e3 / t))
                    })
                })
            }
            static parseEmoji(e) {
                if (e.includes("%") && (e = decodeURIComponent(e)), !e.includes(":")) return {
                    animated: !1,
                    name: e,
                    id: null
                };
                const t = e.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/);
                return t ? {
                    animated: Boolean(t[1]),
                    name: t[2],
                    id: t[3]
                } : null
            }
            static arraysEqual(e, t) {
                if (e === t) return !0;
                if (e.length !== t.length) return !1;
                for (const s of e) {
                    const e = t.indexOf(s); - 1 !== e && t.splice(e, 1)
                }
                return 0 === t.length
            }
            static cloneObject(e) {
                return Object.assign(Object.create(e), e)
            }
            static mergeDefault(e, t) {
                if (!t) return e;
                for (const s in e) h(t, s) && void 0 !== t[s] ? t[s] === Object(t[s]) && (t[s] = d.mergeDefault(e[s], t[s])) : t[s] = e[s];
                return t
            }
            static convertToBuffer(e) {
                return "string" == typeof e && (e = d.str2ab(e)), Buffer.from(e)
            }
            static str2ab(e) {
                const t = new ArrayBuffer(2 * e.length),
                    s = new Uint16Array(t);
                for (var i = 0, n = e.length; i < n; i++) s[i] = e.charCodeAt(i);
                return t
            }
            static makeError(e) {
                const t = new Error(e.message);
                return t.name = e.name, t.stack = e.stack, t
            }
            static makePlainError(e) {
                return {
                    name: e.name,
                    message: e.message,
                    stack: e.stack
                }
            }
            static moveElementInArray(e, t, s, i = !1) {
                const n = e.indexOf(t);
                if ((s = (i ? n : 0) + s) > -1 && s < e.length) {
                    const t = e.splice(n, 1)[0];
                    e.splice(s, 0, t)
                }
                return e.indexOf(t)
            }
            static resolveString(e) {
                return "string" == typeof e ? e : e instanceof Array ? e.join("\n") : String(e)
            }
            static resolveColor(e) {
                if ("string" == typeof e) {
                    if ("RANDOM" === e) return Math.floor(16777216 * Math.random());
                    if ("DEFAULT" === e) return 0;
                    e = n[e] || parseInt(e.replace("#", ""), 16)
                } else e instanceof Array && (e = (e[0] << 16) + (e[1] << 8) + e[2]);
                if (e < 0 || e > 16777215) throw new c("COLOR_RANGE");
                if (e && isNaN(e)) throw new l("COLOR_CONVERT");
                return e
            }
            static discordSort(e) {
                return e.sort((e, t) => e.rawPosition - t.rawPosition || parseInt(t.id.slice(0, -10)) - parseInt(e.id.slice(0, -10)) || parseInt(t.id.slice(10)) - parseInt(e.id.slice(10)))
            }
            static setPosition(e, t, s, i, n, r) {
                let o = i.array();
                return d.moveElementInArray(o, e, t, s), o = o.map((e, t) => ({
                    id: e.id,
                    position: t
                })), n.patch({
                    data: o,
                    reason: r
                }).then(() => o)
            }
            static basename(e, t) {
                let s = u.exec(e)[3];
                return t && s.endsWith(t) && (s = s.slice(0, -t.length)), s
            }
            static idToBinary(e) {
                let t = "",
                    s = parseInt(e.slice(0, -10)) || 0,
                    i = parseInt(e.slice(-10));
                for (; i > 0 || s > 0;) t = String(1 & i) + t, i = Math.floor(i / 2), s > 0 && (i += s % 2 * 5e9, s = Math.floor(s / 2));
                return t
            }
            static binaryToID(e) {
                let t = "";
                for (; e.length > 50;) {
                    const s = parseInt(e.slice(0, -32), 2),
                        i = parseInt((s % 10).toString(2) + e.slice(-32), 2);
                    t = (i % 10).toString() + t, e = Math.floor(s / 10).toString(2) + Math.floor(i / 10).toString(2).padStart(32, "0")
                }
                for (e = parseInt(e, 2); e > 0;) t = (e % 10).toString() + t, e = Math.floor(e / 10);
                return t
            }
            static delayFor(e) {
                return new Promise(t => {
                    setTimeout(t, e)
                })
            }
        }
        e.exports = d
    }, function(e, t, s) {
        const i = t.Package = s(80),
            {
                Error: n,
                RangeError: r
            } = s(1),
            o = t.browser = "undefined" != typeof window;
        t.DefaultOptions = {
            apiRequestMethod: "sequential",
            shardId: 0,
            shardCount: 0,
            internalSharding: !1,
            messageCacheMaxSize: 200,
            messageCacheLifetime: 0,
            messageSweepInterval: 0,
            fetchAllMembers: !1,
            disableEveryone: !1,
            sync: !1,
            restWsBridgeTimeout: 5e3,
            disabledEvents: [],
            restTimeOffset: 500,
            presence: {},
            ws: {
                large_threshold: 250,
                compress: !1,
                properties: {
                    $os: o ? "browser" : process.platform,
                    $browser: "discord.js",
                    $device: "discord.js"
                },
                version: 6
            },
            http: {
                version: 7,
                api: "https://discordapp.com/api",
                cdn: "https://cdn.discordapp.com",
                invite: "https://discord.gg"
            }
        }, t.UserAgent = o ? null : `DiscordBot (${i.homepage.split("#")[0]}, ${i.version}) Node.js/${process.version}`, t.WSCodes = {
            1000: "Connection gracefully closed",
            4004: "Tried to identify with an invalid token",
            4010: "Sharding data provided was invalid",
            4011: "Shard would be on too many guilds if connected"
        };
        const a = ["webp", "png", "jpg", "gif"],
            c = Array.from({
                length: 8
            }, (e, t) => 2 ** (t + 4));

        function l(e, {
            format: t = "webp",
            size: s
        } = {}) {
            if (t && !a.includes(t)) throw new n("IMAGE_FORMAT", t);
            if (s && !c.includes(s)) throw new r("IMAGE_SIZE", s);
            return `${e}.${t}${s?`?size=${s}`:""}`
        }
        t.Endpoints = {
            CDN: e => ({
                Emoji: (t, s = "png") => `${e}/emojis/${t}.${s}`,
                Asset: t => `${e}/assets/${t}`,
                DefaultAvatar: t => `${e}/embed/avatars/${t}.png`,
                Avatar: (t, s, i = "default", n) => "1" === t ? s : ("default" === i && (i = s.startsWith("a_") ? "gif" : "webp"), l(`${e}/avatars/${t}/${s}`, {
                    format: i,
                    size: n
                })),
                Icon: (t, s, i = "webp", n) => l(`${e}/icons/${t}/${s}`, {
                    format: i,
                    size: n
                }),
                AppIcon: (t, s, {
                    format: i = "webp",
                    size: n
                } = {}) => l(`${e}/app-icons/${t}/${s}`, {
                    size: n,
                    format: i
                }),
                AppAsset: (t, s, {
                    format: i = "webp",
                    size: n
                } = {}) => l(`${e}/app-assets/${t}/${s}`, {
                    size: n,
                    format: i
                }),
                GDMIcon: (t, s, i = "webp", n) => l(`${e}/channel-icons/${t}/${s}`, {
                    size: n,
                    format: i
                }),
                Splash: (t, s, i = "webp", n) => l(`${e}/splashes/${t}/${s}`, {
                    size: n,
                    format: i
                })
            }),
            invite: (e, t) => `${e}/${t}`,
            botGateway: "/gateway/bot"
        }, t.Status = {
            READY: 0,
            CONNECTING: 1,
            RECONNECTING: 2,
            IDLE: 3,
            NEARLY: 4,
            DISCONNECTED: 5
        }, t.VoiceStatus = {
            CONNECTED: 0,
            CONNECTING: 1,
            AUTHENTICATING: 2,
            RECONNECTING: 3,
            DISCONNECTED: 4
        }, t.OPCodes = {
            DISPATCH: 0,
            HEARTBEAT: 1,
            IDENTIFY: 2,
            STATUS_UPDATE: 3,
            VOICE_STATE_UPDATE: 4,
            VOICE_GUILD_PING: 5,
            RESUME: 6,
            RECONNECT: 7,
            REQUEST_GUILD_MEMBERS: 8,
            INVALID_SESSION: 9,
            HELLO: 10,
            HEARTBEAT_ACK: 11
        }, t.VoiceOPCodes = {
            IDENTIFY: 0,
            SELECT_PROTOCOL: 1,
            READY: 2,
            HEARTBEAT: 3,
            SESSION_DESCRIPTION: 4,
            SPEAKING: 5
        }, t.Events = {
            RATE_LIMIT: "rateLimit",
            READY: "ready",
            RESUMED: "resumed",
            GUILD_CREATE: "guildCreate",
            GUILD_DELETE: "guildDelete",
            GUILD_UPDATE: "guildUpdate",
            GUILD_UNAVAILABLE: "guildUnavailable",
            GUILD_AVAILABLE: "guildAvailable",
            GUILD_MEMBER_ADD: "guildMemberAdd",
            GUILD_MEMBER_REMOVE: "guildMemberRemove",
            GUILD_MEMBER_UPDATE: "guildMemberUpdate",
            GUILD_MEMBER_AVAILABLE: "guildMemberAvailable",
            GUILD_MEMBER_SPEAKING: "guildMemberSpeaking",
            GUILD_MEMBERS_CHUNK: "guildMembersChunk",
            GUILD_ROLE_CREATE: "roleCreate",
            GUILD_ROLE_DELETE: "roleDelete",
            GUILD_ROLE_UPDATE: "roleUpdate",
            GUILD_EMOJI_CREATE: "emojiCreate",
            GUILD_EMOJI_DELETE: "emojiDelete",
            GUILD_EMOJI_UPDATE: "emojiUpdate",
            GUILD_BAN_ADD: "guildBanAdd",
            GUILD_BAN_REMOVE: "guildBanRemove",
            CHANNEL_CREATE: "channelCreate",
            CHANNEL_DELETE: "channelDelete",
            CHANNEL_UPDATE: "channelUpdate",
            CHANNEL_PINS_UPDATE: "channelPinsUpdate",
            MESSAGE_CREATE: "message",
            MESSAGE_DELETE: "messageDelete",
            MESSAGE_UPDATE: "messageUpdate",
            MESSAGE_BULK_DELETE: "messageDeleteBulk",
            MESSAGE_REACTION_ADD: "messageReactionAdd",
            MESSAGE_REACTION_REMOVE: "messageReactionRemove",
            MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll",
            USER_UPDATE: "userUpdate",
            USER_NOTE_UPDATE: "userNoteUpdate",
            USER_SETTINGS_UPDATE: "clientUserSettingsUpdate",
            USER_GUILD_SETTINGS_UPDATE: "clientUserGuildSettingsUpdate",
            PRESENCE_UPDATE: "presenceUpdate",
            VOICE_STATE_UPDATE: "voiceStateUpdate",
            VOICE_BROADCAST_SUBSCRIBE: "subscribe",
            VOICE_BROADCAST_UNSUBSCRIBE: "unsubscribe",
            TYPING_START: "typingStart",
            TYPING_STOP: "typingStop",
            DISCONNECT: "disconnect",
            RECONNECTING: "reconnecting",
            ERROR: "error",
            WARN: "warn",
            DEBUG: "debug"
        }, t.WSEvents = function(e) {
            let t = Object.create(null);
            for (const s of e) t[s] = s;
            return t
        }(["READY", "RESUMED", "GUILD_SYNC", "GUILD_CREATE", "GUILD_DELETE", "GUILD_UPDATE", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_MEMBER_UPDATE", "GUILD_MEMBERS_CHUNK", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "GUILD_EMOJIS_UPDATE", "CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEL_PINS_UPDATE", "MESSAGE_CREATE", "MESSAGE_DELETE", "MESSAGE_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "USER_UPDATE", "USER_NOTE_UPDATE", "USER_SETTINGS_UPDATE", "USER_GUILD_SETTINGS_UPDATE", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE", "TYPING_START", "VOICE_SERVER_UPDATE", "RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE"]), t.MessageTypes = ["DEFAULT", "RECIPIENT_ADD", "RECIPIENT_REMOVE", "CALL", "CHANNEL_NAME_CHANGE", "CHANNEL_ICON_CHANGE", "PINS_ADD", "GUILD_MEMBER_JOIN"], t.ActivityTypes = ["PLAYING", "STREAMING", "LISTENING", "WATCHING"], t.ActivityFlags = {
            INSTANCE: 1,
            JOIN: 2,
            SPECTATE: 4,
            JOIN_REQUEST: 8,
            SYNC: 16,
            PLAY: 32
        }, t.ExplicitContentFilterTypes = ["DISABLED", "NON_FRIENDS", "FRIENDS_AND_NON_FRIENDS"], t.MessageNotificationTypes = ["EVERYTHING", "MENTIONS", "NOTHING", "INHERIT"], t.UserSettingsMap = {
            convert_emoticons: "convertEmoticons",
            default_guilds_restricted: "defaultGuildsRestricted",
            detect_platform_accounts: "detectPlatformAccounts",
            developer_mode: "developerMode",
            enable_tts_command: "enableTTSCommand",
            theme: "theme",
            status: "status",
            show_current_game: "showCurrentGame",
            inline_attachment_media: "inlineAttachmentMedia",
            inline_embed_media: "inlineEmbedMedia",
            locale: "locale",
            message_display_compact: "messageDisplayCompact",
            render_reactions: "renderReactions",
            guild_positions: "guildPositions",
            restricted_guilds: "restrictedGuilds",
            explicit_content_filter: function(e) {
                return t.ExplicitContentFilterTypes[e]
            },
            friend_source_flags: function(e) {
                return {
                    all: e.all || !1,
                    mutualGuilds: !!e.all || (e.mutual_guilds || !1),
                    mutualFriends: !!e.all || (e.mutualFriends || !1)
                }
            }
        }, t.UserGuildSettingsMap = {
            message_notifications: function(e) {
                return t.MessageNotificationTypes[e]
            },
            mobile_push: "mobilePush",
            muted: "muted",
            suppress_everyone: "suppressEveryone",
            channel_overrides: "channelOverrides"
        }, t.UserChannelOverrideMap = {
            message_notifications: function(e) {
                return t.MessageNotificationTypes[e]
            },
            muted: "muted"
        }, t.UserFlags = {
            STAFF: 1,
            PARTNER: 2,
            HYPESQUAD: 4
        }, t.ChannelTypes = {
            TEXT: 0,
            DM: 1,
            VOICE: 2,
            GROUP: 3,
            CATEGORY: 4
        }, t.ClientApplicationAssetTypes = {
            SMALL: 1,
            BIG: 2
        }, t.Colors = {
            DEFAULT: 0,
            AQUA: 1752220,
            GREEN: 3066993,
            BLUE: 3447003,
            PURPLE: 10181046,
            LUMINOUS_VIVID_PINK: 15277667,
            GOLD: 15844367,
            ORANGE: 15105570,
            RED: 15158332,
            GREY: 9807270,
            NAVY: 3426654,
            DARK_AQUA: 1146986,
            DARK_GREEN: 2067276,
            DARK_BLUE: 2123412,
            DARK_PURPLE: 7419530,
            DARK_VIVID_PINK: 11342935,
            DARK_GOLD: 12745742,
            DARK_ORANGE: 11027200,
            DARK_RED: 10038562,
            DARK_GREY: 9936031,
            DARKER_GREY: 8359053,
            LIGHT_GREY: 12370112,
            DARK_NAVY: 2899536,
            BLURPLE: 7506394,
            GREYPLE: 10070709,
            DARK_BUT_NOT_BLACK: 2895667,
            NOT_QUITE_BLACK: 2303786
        }, t.APIErrors = {
            UNKNOWN_ACCOUNT: 10001,
            UNKNOWN_APPLICATION: 10002,
            UNKNOWN_CHANNEL: 10003,
            UNKNOWN_GUILD: 10004,
            UNKNOWN_INTEGRATION: 10005,
            UNKNOWN_INVITE: 10006,
            UNKNOWN_MEMBER: 10007,
            UNKNOWN_MESSAGE: 10008,
            UNKNOWN_OVERWRITE: 10009,
            UNKNOWN_PROVIDER: 10010,
            UNKNOWN_ROLE: 10011,
            UNKNOWN_TOKEN: 10012,
            UNKNOWN_USER: 10013,
            UNKNOWN_EMOJI: 10014,
            BOT_PROHIBITED_ENDPOINT: 20001,
            BOT_ONLY_ENDPOINT: 20002,
            MAXIMUM_GUILDS: 30001,
            MAXIMUM_FRIENDS: 30002,
            MAXIMUM_PINS: 30003,
            MAXIMUM_ROLES: 30005,
            MAXIMUM_REACTIONS: 30010,
            UNAUTHORIZED: 40001,
            MISSING_ACCESS: 50001,
            INVALID_ACCOUNT_TYPE: 50002,
            CANNOT_EXECUTE_ON_DM: 50003,
            EMBED_DISABLED: 50004,
            CANNOT_EDIT_MESSAGE_BY_OTHER: 50005,
            CANNOT_SEND_EMPTY_MESSAGE: 50006,
            CANNOT_MESSAGE_USER: 50007,
            CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: 50008,
            CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: 50009,
            OAUTH2_APPLICATION_BOT_ABSENT: 50010,
            MAXIMUM_OAUTH2_APPLICATIONS: 50011,
            INVALID_OAUTH_STATE: 50012,
            MISSING_PERMISSIONS: 50013,
            INVALID_AUTHENTICATION_TOKEN: 50014,
            NOTE_TOO_LONG: 50015,
            INVALID_BULK_DELETE_QUANTITY: 50016,
            CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: 50019,
            CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: 50021,
            BULK_DELETE_MESSAGE_TOO_OLD: 50034,
            INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT: 50036,
            REACTION_BLOCKED: 90001
        }
    }, function(e, t, s) {
        const i = s(2);
        class n extends Map {
            constructor(e) {
                super(e), Object.defineProperty(this, "_array", {
                    value: null,
                    writable: !0,
                    configurable: !0
                }), Object.defineProperty(this, "_keyArray", {
                    value: null,
                    writable: !0,
                    configurable: !0
                })
            }
            set(e, t) {
                return this._array = null, this._keyArray = null, super.set(e, t)
            }
            delete(e) {
                return this._array = null, this._keyArray = null, super.delete(e)
            }
            array() {
                return this._array && this._array.length === this.size || (this._array = [...this.values()]), this._array
            }
            keyArray() {
                return this._keyArray && this._keyArray.length === this.size || (this._keyArray = [...this.keys()]), this._keyArray
            }
            first(e) {
                if (void 0 === e) return this.values().next().value;
                if (e < 0) return this.last(-1 * e);
                e = Math.min(this.size, e);
                const t = new Array(e),
                    s = this.values();
                for (let i = 0; i < e; i++) t[i] = s.next().value;
                return t
            }
            firstKey(e) {
                if (void 0 === e) return this.keys().next().value;
                if (e < 0) return this.lastKey(-1 * e);
                e = Math.min(this.size, e);
                const t = new Array(e),
                    s = this.keys();
                for (let i = 0; i < e; i++) t[i] = s.next().value;
                return t
            }
            last(e) {
                const t = this.array();
                return void 0 === e ? t[t.length - 1] : e < 0 ? this.first(-1 * e) : e ? t.slice(-e) : []
            }
            lastKey(e) {
                const t = this.keyArray();
                return void 0 === e ? t[t.length - 1] : e < 0 ? this.firstKey(-1 * e) : e ? t.slice(-e) : []
            }
            random(e) {
                let t = this.array();
                if (void 0 === e) return t[Math.floor(Math.random() * t.length)];
                if (0 === t.length || !e) return [];
                const s = new Array(e);
                t = t.slice();
                for (let i = 0; i < e; i++) s[i] = t.splice(Math.floor(Math.random() * t.length), 1)[0];
                return s
            }
            randomKey(e) {
                let t = this.keyArray();
                if (void 0 === e) return t[Math.floor(Math.random() * t.length)];
                if (0 === t.length || !e) return [];
                const s = new Array(e);
                t = t.slice();
                for (let i = 0; i < e; i++) s[i] = t.splice(Math.floor(Math.random() * t.length), 1)[0];
                return s
            }
            findAll(e, t) {
                if ("string" != typeof e) throw new TypeError("Key must be a string.");
                if (void 0 === t) throw new Error("Value must be specified.");
                const s = [];
                for (const i of this.values()) i[e] === t && s.push(i);
                return s
            }
            find(e, t) {
                if ("string" != typeof e) {
                    if ("function" != typeof e) throw new Error("First argument must be a property string or a function.");
                    for (const [t, s] of this)
                        if (e(s, t, this)) return s
                } else {
                    if (void 0 === t) throw new Error("Value must be specified.");
                    for (const s of this.values())
                        if (s[e] === t) return s
                }
            }
            findKey(e, t) {
                if ("string" != typeof e) {
                    if ("function" != typeof e) throw new Error("First argument must be a property string or a function.");
                    for (const [t, s] of this)
                        if (e(s, t, this)) return t
                } else {
                    if (void 0 === t) throw new Error("Value must be specified.");
                    for (const [s, i] of this)
                        if (i[e] === t) return s
                }
            }
            exists(e, t) {
                return Boolean(this.find(e, t))
            }
            filter(e, t) {
                t && (e = e.bind(t));
                const s = new n;
                for (const [t, i] of this) e(i, t, this) && s.set(t, i);
                return s
            }
            filterArray(e, t) {
                t && (e = e.bind(t));
                const s = [];
                for (const [t, i] of this) e(i, t, this) && s.push(i);
                return s
            }
            map(e, t) {
                t && (e = e.bind(t));
                const s = new Array(this.size);
                let i = 0;
                for (const [t, n] of this) s[i++] = e(n, t, this);
                return s
            }
            some(e, t) {
                t && (e = e.bind(t));
                for (const [t, s] of this)
                    if (e(s, t, this)) return !0;
                return !1
            }
            every(e, t) {
                t && (e = e.bind(t));
                for (const [t, s] of this)
                    if (!e(s, t, this)) return !1;
                return !0
            }
            reduce(e, t) {
                let s;
                if (void 0 !== t) {
                    s = t;
                    for (const [t, i] of this) s = e(s, i, t, this)
                } else {
                    let t = !0;
                    for (const [i, n] of this) t ? (s = n, t = !1) : s = e(s, n, i, this)
                }
                return s
            }
            clone() {
                return new this.constructor(this)
            }
            concat(...e) {
                const t = this.clone();
                for (const s of e)
                    for (const [e, i] of s) t.set(e, i);
                return t
            }
            deleteAll() {
                const e = [];
                for (const t of this.values()) t.delete && e.push(t.delete());
                return e
            }
            equals(e) {
                return !!e && (this === e || this.size === e.size && !this.find((t, s) => {
                    const i = e.get(s);
                    return i !== t || void 0 === i && !e.has(s)
                }))
            }
            sort(e = ((e, t) => +(e > t) || +(e === t) - 1)) {
                return new n([...this.entries()].sort((t, s) => e(t[1], s[1], t[0], s[0])))
            }
            toJSON() {
                return this.map(e => "function" == typeof e.toJSON ? e.toJSON() : i.flatten(e))
            }
        }
        e.exports = n
    }, function(e, t, s) {
        const i = s(4);
        let n;
        e.exports = class extends i {
            constructor(e, t, i) {
                if (super(), n || (n = s(35)), Object.defineProperty(this, "client", {
                        value: e
                    }), Object.defineProperty(this, "holds", {
                        value: n.get(i.name) || i
                    }), t)
                    for (const e of t) this.add(e)
            }
            add(e, t = !0, {
                id: s,
                extras: i = []
            } = {}) {
                const n = this.get(s || e.id);
                if (n) return n;
                const r = this.holds ? new this.holds(this.client, e, ...i) : e;
                return t && this.set(s || r.id, r), r
            }
            remove(e) {
                return this.delete(e)
            }
            resolve(e) {
                return e instanceof this.holds ? e : "string" == typeof e && this.get(e) || null
            }
            resolveID(e) {
                return e instanceof this.holds ? e.id : "string" == typeof e ? e : null
            }
        }
    }, function(e, t, s) {
        const i = s(2);
        e.exports = class {
            constructor(e) {
                Object.defineProperty(this, "client", {
                    value: e
                })
            }
            _clone() {
                return Object.assign(Object.create(this), this)
            }
            _patch(e) {
                return e
            }
            _update(e) {
                const t = this._clone();
                return this._patch(e), t
            }
            toJSON(...e) {
                return i.flatten(this, ...e)
            }
            valueOf() {
                return this.id
            }
        }
    }, function(e, t, s) {
        const i = s(2),
            n = 14200704e5;
        let r = 0;
        e.exports = class {
            constructor() {
                throw new Error(`The ${this.constructor.name} class may not be instantiated.`)
            }
            static generate(e = Date.now()) {
                if (e instanceof Date && (e = e.getTime()), "number" != typeof e || isNaN(e)) throw new TypeError(`"timestamp" argument must be a number (received ${isNaN(e)?"NaN":typeof e})`);
                r >= 4095 && (r = 0);
                const t = `${(e-n).toString(2).padStart(42,"0")}0000100000${(r++).toString(2).padStart(12,"0")}`;
                return i.binaryToID(t)
            }
            static deconstruct(e) {
                const t = i.idToBinary(e).toString(2).padStart(64, "0"),
                    s = {
                        timestamp: parseInt(t.substring(0, 42), 2) + n,
                        workerID: parseInt(t.substring(42, 47), 2),
                        processID: parseInt(t.substring(47, 52), 2),
                        increment: parseInt(t.substring(52, 64), 2),
                        binary: t
                    };
                return Object.defineProperty(s, "date", {
                    get: function() {
                        return new Date(this.timestamp)
                    },
                    enumerable: !0
                }), s
            }
        }
    }, function(e, t, s) {
        const {
            RangeError: i
        } = s(1);
        class n {
            constructor(e) {
                this.bitfield = this.constructor.resolve(e)
            }
            has(e, t = !0) {
                return e instanceof Array ? e.every(e => this.has(e, t)) : (e = this.constructor.resolve(e), !!(t && (this.bitfield & this.constructor.FLAGS.ADMINISTRATOR) > 0) || (this.bitfield & e) === e)
            }
            missing(e, t = !0) {
                return e instanceof Array || (e = new this.constructor(e).toArray(!1)), e.filter(e => !this.has(e, t))
            }
            freeze() {
                return Object.freeze(this)
            }
            add(...e) {
                let t = 0;
                for (let s = e.length - 1; s >= 0; s--) {
                    t |= this.constructor.resolve(e[s])
                }
                return Object.isFrozen(this) ? new this.constructor(this.bitfield | t) : (this.bitfield |= t, this)
            }
            remove(...e) {
                let t = 0;
                for (let s = e.length - 1; s >= 0; s--) {
                    t |= this.constructor.resolve(e[s])
                }
                return Object.isFrozen(this) ? new this.constructor(this.bitfield & ~t) : (this.bitfield &= ~t, this)
            }
            serialize(e = !0) {
                const t = {};
                for (const s in this.constructor.FLAGS) t[s] = this.has(s, e);
                return t
            }
            toArray(e = !0) {
                return Object.keys(this.constructor.FLAGS).filter(t => this.has(t, e))
            }
            toJSON() {
                return this.bitfield
            }
            valueOf() {
                return this.bitfield
            }*[Symbol.iterator]() {
                const e = this.toArray();
                for (; e.length;) yield e.shift()
            }
            static resolve(e) {
                if ("number" == typeof e && e >= 0) return e;
                if (e instanceof n) return e.bitfield;
                if (e instanceof Array) return e.map(e => this.resolve(e)).reduce((e, t) => e | t, 0);
                if ("string" == typeof e) return this.FLAGS[e];
                throw new i("PERMISSIONS_INVALID")
            }
        }
        n.FLAGS = {
            CREATE_INSTANT_INVITE: 1,
            KICK_MEMBERS: 2,
            BAN_MEMBERS: 4,
            ADMINISTRATOR: 8,
            MANAGE_CHANNELS: 16,
            MANAGE_GUILD: 32,
            ADD_REACTIONS: 64,
            VIEW_AUDIT_LOG: 128,
            VIEW_CHANNEL: 1024,
            SEND_MESSAGES: 2048,
            SEND_TTS_MESSAGES: 4096,
            MANAGE_MESSAGES: 8192,
            EMBED_LINKS: 16384,
            ATTACH_FILES: 32768,
            READ_MESSAGE_HISTORY: 65536,
            MENTION_EVERYONE: 1 << 17,
            USE_EXTERNAL_EMOJIS: 1 << 18,
            CONNECT: 1 << 20,
            SPEAK: 1 << 21,
            MUTE_MEMBERS: 1 << 22,
            DEAFEN_MEMBERS: 1 << 23,
            MOVE_MEMBERS: 1 << 24,
            USE_VAD: 1 << 25,
            CHANGE_NICKNAME: 1 << 26,
            MANAGE_NICKNAMES: 1 << 27,
            MANAGE_ROLES: 1 << 28,
            MANAGE_WEBHOOKS: 1 << 29,
            MANAGE_EMOJIS: 1 << 30
        }, n.ALL = Object.values(n.FLAGS).reduce((e, t) => e | t, 0), n.DEFAULT = 104324097, e.exports = n
    }, function(e, t, s) {
        const i = s(37),
            n = s(37),
            r = s(21),
            o = s(2),
            {
                Error: a,
                TypeError: c
            } = s(1),
            {
                browser: l
            } = s(3);
        class h {
            constructor() {
                throw new Error(`The ${this.constructor.name} class may not be instantiated.`)
            }
            static resolveInviteCode(e) {
                const t = /discord(?:app\.com\/invite|\.gg)\/([\w-]{2,255})/i.exec(e);
                return t && t[1] ? t[1] : e
            }
            static async resolveImage(e) {
                if (!e) return null;
                if ("string" == typeof e && e.startsWith("data:")) return e;
                const t = await this.resolveFile(e);
                return h.resolveBase64(t)
            }
            static resolveBase64(e) {
                return e instanceof Buffer ? `data:image/jpg;base64,${e.toString("base64")}` : e
            }
            static resolveFile(e) {
                return e instanceof Buffer ? Promise.resolve(e) : l && e instanceof ArrayBuffer ? Promise.resolve(o.convertToBuffer(e)) : "string" == typeof e ? /^https?:\/\//.test(e) ? r.get(e).then(e => e.body instanceof Buffer ? e.body : Buffer.from(e.text)) : new Promise((t, s) => {
                    const r = l ? e : i.resolve(e);
                    n.stat(r, (e, i) => e ? s(e) : i && i.isFile() ? (n.readFile(r, (e, i) => {
                        e ? s(e) : t(i)
                    }), null) : s(new a("FILE_NOT_FOUND", r)))
                }) : e.pipe && "function" == typeof e.pipe ? new Promise((t, s) => {
                    const i = [];
                    e.once("error", s), e.on("data", e => i.push(e)), e.once("end", () => t(Buffer.concat(i)))
                }) : Promise.reject(new c("REQ_RESOURCE_TYPE"))
            }
        }
        e.exports = h
    }, function(e, t, s) {
        const i = s(7),
            n = s(6),
            {
                ChannelTypes: r
            } = s(3);
        e.exports = class extends n {
            constructor(e, t) {
                super(e);
                const s = Object.keys(r)[t.type];
                this.type = s ? s.toLowerCase() : "unknown", t && this._patch(t)
            }
            _patch(e) {
                this.id = e.id
            }
            get createdTimestamp() {
                return i.deconstruct(this.id).timestamp
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            toString() {
                return `<#${this.id}>`
            }
            delete() {
                return this.client.api.channels(this.id).delete().then(() => this)
            }
            static create(e, t, i) {
                const n = s(35);
                let o;
                if (t.type === r.DM) o = new(n.get("DMChannel"))(e, t);
                else if (t.type === r.GROUP) o = new(n.get("GroupDMChannel"))(e, t);
                else if (i = i || e.guilds.get(t.guild_id)) {
                    switch (t.type) {
                        case r.TEXT:
                            o = new(n.get("TextChannel"))(i, t);
                            break;
                        case r.VOICE:
                            o = new(n.get("VoiceChannel"))(i, t);
                            break;
                        case r.CATEGORY:
                            o = new(n.get("CategoryChannel"))(i, t);
                            break;
                        default:
                            o = new(n.get("GuildChannel"))(i, t)
                    }
                    i.channels.set(o.id, o)
                }
                return o
            }
            toJSON(...e) {
                return super.toJSON({
                    createdTimestamp: !0
                }, ...e)
            }
        }
    }, function(e, t, s) {
        const i = s(10),
            n = s(13),
            r = s(36),
            o = s(29),
            a = s(61),
            c = s(2),
            l = s(8),
            h = s(4),
            {
                MessageNotificationTypes: u
            } = s(3),
            {
                Error: d,
                TypeError: p
            } = s(1);
        e.exports = class extends i {
            constructor(e, t) {
                super(e.client, t), this.guild = e
            }
            _patch(e) {
                if (super._patch(e), this.name = e.name, this.rawPosition = e.position, this.parentID = e.parent_id, this.permissionOverwrites = new h, e.permission_overwrites)
                    for (const t of e.permission_overwrites) this.permissionOverwrites.set(t.id, new a(this, t))
            }
            get parent() {
                return this.guild.channels.get(this.parentID) || null
            }
            get permissionsLocked() {
                return this.parent ? this.permissionOverwrites.size === this.parent.permissionOverwrites.size && !this.permissionOverwrites.find((e, t) => {
                    const s = this.parent.permissionOverwrites.get(t);
                    return void 0 === s || s.denied.bitfield !== e.denied.bitfield || s.allowed.bitfield !== e.allowed.bitfield
                }) : null
            }
            get position() {
                const e = this.guild._sortedChannels(this);
                return e.array().indexOf(e.get(this.id))
            }
            permissionsFor(e) {
                const t = this.guild.members.resolve(e);
                if (t) return this.memberPermissions(t);
                const s = this.guild.roles.resolve(e);
                return s ? this.rolePermissions(s) : null
            }
            overwritesFor(e, t = !1, s = null) {
                if (t || (e = this.guild.members.resolve(e)), !e) return [];
                s = s || e.roles;
                const i = [];
                let n, r;
                for (const t of this.permissionOverwrites.values()) t.id === this.guild.id ? r = t : s.has(t.id) ? i.push(t) : t.id === e.id && (n = t);
                return {
                    everyone: r,
                    roles: i,
                    member: n
                }
            }
            memberPermissions(e) {
                if (e.id === this.guild.ownerID) return new l(l.ALL).freeze();
                const t = e.roles,
                    s = new l(t.map(e => e.permissions));
                if (s.has(l.FLAGS.ADMINISTRATOR)) return new l(l.ALL).freeze();
                const i = this.overwritesFor(e, !0, t);
                return s.remove(i.everyone ? i.everyone.denied : 0).add(i.everyone ? i.everyone.allowed : 0).remove(i.roles.length > 0 ? i.roles.map(e => e.denied) : 0).add(i.roles.length > 0 ? i.roles.map(e => e.allowed) : 0).remove(i.member ? i.member.denied : 0).add(i.member ? i.member.allowed : 0).freeze()
            }
            rolePermissions(e) {
                if (e.permissions.has(l.FLAGS.ADMINISTRATOR)) return new l(l.ALL).freeze();
                const t = this.permissionOverwrites.get(this.guild.id),
                    s = this.permissionOverwrites.get(e.id);
                return e.permissions.remove(t ? t.denied : 0).add(t ? t.allowed : 0).remove(s ? s.denied : 0).add(s ? s.allowed : 0).freeze()
            }
            overwritePermissions({
                overwrites: e,
                reason: t
            } = {}) {
                return this.edit({
                    permissionOverwrites: o.call(this, e),
                    reason: t
                }).then(() => this)
            }
            updateOverwrite(e, t, s) {
                const i = new l(0),
                    r = new l(0);
                let o;
                const a = this.guild.roles.get(e);
                if (a || e instanceof n) e = a || e, o = "role";
                else if (o = "member", !(e = this.client.users.resolve(e))) return Promise.reject(new p("INVALID_TYPE", "parameter", "User nor a Role", !0));
                const c = this.permissionOverwrites.get(e.id);
                c && (i.add(c.allowed), r.add(c.denied));
                for (const e in t) !0 === t[e] ? (i.add(l.FLAGS[e] || 0), r.remove(l.FLAGS[e] || 0)) : !1 === t[e] ? (i.remove(l.FLAGS[e] || 0), r.add(l.FLAGS[e] || 0)) : null === t[e] && (i.remove(l.FLAGS[e] || 0), r.remove(l.FLAGS[e] || 0));
                return this.client.api.channels(this.id).permissions[e.id].put({
                    data: {
                        id: e.id,
                        type: o,
                        allow: i.bitfield,
                        deny: r.bitfield
                    },
                    reason: s
                }).then(() => this)
            }
            lockPermissions() {
                if (!this.parent) return Promise.reject(new d("GUILD_CHANNEL_ORPHAN"));
                const e = this.parent.permissionOverwrites.map(e => ({
                    deny: e.denied.bitfield,
                    allow: e.allowed.bitfield,
                    id: e.id,
                    type: e.type
                }));
                return this.edit({
                    permissionOverwrites: e
                })
            }
            get members() {
                const e = new h;
                for (const t of this.guild.members.values()) this.permissionsFor(t).has("VIEW_CHANNEL") && e.set(t.id, t);
                return e
            }
            async edit(e, t) {
                return void 0 !== e.position && await c.setPosition(this, e.position, !1, this.guild._sortedChannels(this), this.client.api.guilds(this.guild.id).channels, t).then(e => {
                    this.client.actions.GuildChannelsPositionUpdate.handle({
                        guild_id: this.guild.id,
                        channels: e
                    })
                }), this.client.api.channels(this.id).patch({
                    data: {
                        name: (e.name || this.name).trim(),
                        topic: e.topic,
                        nsfw: e.nsfw,
                        bitrate: e.bitrate || this.bitrate,
                        user_limit: void 0 !== e.userLimit ? e.userLimit : this.userLimit,
                        parent_id: e.parentID,
                        lock_permissions: e.lockPermissions,
                        permission_overwrites: e.permissionOverwrites
                    },
                    reason: t
                }).then(e => {
                    const t = this._clone();
                    return t._patch(e), t
                })
            }
            setName(e, t) {
                return this.edit({
                    name: e
                }, t)
            }
            setParent(e, {
                lockPermissions: t = !0,
                reason: s
            } = {}) {
                return this.edit({
                    parentID: null !== e ? e.id ? e.id : e : null,
                    lockPermissions: t
                }, s)
            }
            setTopic(e, t) {
                return this.edit({
                    topic: e
                }, t)
            }
            setPosition(e, {
                relative: t,
                reason: s
            } = {}) {
                return c.setPosition(this, e, t, this.guild._sortedChannels(this), this.client.api.guilds(this.guild.id).channels, s).then(e => (this.client.actions.GuildChannelsPositionUpdate.handle({
                    guild_id: this.guild.id,
                    channels: e
                }), this))
            }
            createInvite({
                temporary: e = !1,
                maxAge: t = 86400,
                maxUses: s = 0,
                unique: i,
                reason: n
            } = {}) {
                return this.client.api.channels(this.id).invites.post({
                    data: {
                        temporary: e,
                        max_age: t,
                        max_uses: s,
                        unique: i
                    },
                    reason: n
                }).then(e => new r(this.client, e))
            }
            async fetchInvites() {
                const e = await this.client.api.channels(this.id).invites.get(),
                    t = new h;
                for (const s of e) {
                    const e = new r(this.client, s);
                    t.set(e.code, e)
                }
                return t
            }
            clone(e = {}) {
                return void 0 === e.withPermissions && (e.withPermissions = !0), c.mergeDefault({
                    name: this.name,
                    overwrites: e.withPermissions ? this.permissionOverwrites : [],
                    withTopic: !0,
                    nsfw: this.nsfw,
                    parent: this.parent,
                    bitrate: this.bitrate,
                    userLimit: this.userLimit,
                    reason: null
                }, e), e.type = this.type, this.guild.channels.create(e.name, e).then(t => e.withTopic ? t.setTopic(this.topic) : t)
            }
            equals(e) {
                let t = e && this.id === e.id && this.type === e.type && this.topic === e.topic && this.position === e.position && this.name === e.name;
                return t && (t = this.permissionOverwrites && e.permissionOverwrites ? this.permissionOverwrites.equals(e.permissionOverwrites) : !this.permissionOverwrites && !e.permissionOverwrites), t
            }
            get deletable() {
                return this.permissionsFor(this.client.user).has(l.FLAGS.MANAGE_CHANNELS)
            }
            get manageable() {
                if (this.client.user.id === this.guild.ownerID) return !0;
                const e = this.permissionsFor(this.client.user);
                return !!e && e.has([l.FLAGS.MANAGE_CHANNELS, l.FLAGS.VIEW_CHANNEL])
            }
            delete(e) {
                return this.client.api.channels(this.id).delete({
                    reason: e
                }).then(() => this)
            }
            get muted() {
                if (this.client.user.bot) return null;
                try {
                    return this.client.user.guildSettings.get(this.guild.id).channelOverrides.get(this.id).muted
                } catch (e) {
                    return !1
                }
            }
            get messageNotifications() {
                if (this.client.user.bot) return null;
                try {
                    return this.client.user.guildSettings.get(this.guild.id).channelOverrides.get(this.id).messageNotifications
                } catch (e) {
                    return u[3]
                }
            }
        }
    }, function(e, t, s) {
        const i = s(15),
            {
                Presence: n
            } = s(17),
            r = s(65),
            o = s(7),
            a = s(6),
            {
                Error: c
            } = s(1);
        class l extends a {
            constructor(e, t) {
                super(e), this.id = t.id, this.bot = Boolean(t.bot), this._patch(t)
            }
            _patch(e) {
                e.username && (this.username = e.username), e.discriminator && (this.discriminator = e.discriminator), void 0 !== e.avatar && (this.avatar = e.avatar), this.lastMessageID = null, this.lastMessageChannelID = null
            }
            get createdTimestamp() {
                return o.deconstruct(this.id).timestamp
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            get lastMessage() {
                const e = this.client.channels.get(this.lastMessageChannelID);
                return e && e.messages.get(this.lastMessageID) || null
            }
            get presence() {
                if (this.client.presences.has(this.id)) return this.client.presences.get(this.id);
                for (const e of this.client.guilds.values())
                    if (e.presences.has(this.id)) return e.presences.get(this.id);
                return new n(this.client)
            }
            avatarURL({
                format: e,
                size: t
            } = {}) {
                return this.avatar ? this.client.rest.cdn.Avatar(this.id, this.avatar, e, t) : null
            }
            get defaultAvatarURL() {
                return this.client.rest.cdn.DefaultAvatar(this.discriminator % 5)
            }
            displayAvatarURL(e) {
                return this.avatarURL(e) || this.defaultAvatarURL
            }
            get tag() {
                return `${this.username}#${this.discriminator}`
            }
            get note() {
                return this.client.user.notes.get(this.id) || null
            }
            typingIn(e) {
                return (e = this.client.channels.resolve(e))._typing.has(this.id)
            }
            typingSinceIn(e) {
                return (e = this.client.channels.resolve(e))._typing.has(this.id) ? new Date(e._typing.get(this.id).since) : null
            }
            typingDurationIn(e) {
                return (e = this.client.channels.resolve(e))._typing.has(this.id) ? e._typing.get(this.id).elapsedTime : -1
            }
            get dmChannel() {
                return this.client.channels.filter(e => "dm" === e.type).find(e => e.recipient.id === this.id) || null
            }
            createDM() {
                return this.dmChannel ? Promise.resolve(this.dmChannel) : this.client.api.users(this.client.user.id).channels.post({
                    data: {
                        recipient_id: this.id
                    }
                }).then(e => this.client.actions.ChannelCreate.handle(e).channel)
            }
            deleteDM() {
                return this.dmChannel ? this.client.api.channels(this.dmChannel.id).delete().then(e => this.client.actions.ChannelDelete.handle(e).channel) : Promise.reject(new c("USER_NO_DMCHANNEL"))
            }
            fetchProfile() {
                return this.client.api.users(this.id).profile.get().then(e => new r(this, e))
            }
            setNote(e) {
                return this.client.api.users("@me").notes(this.id).put({
                    data: {
                        note: e
                    }
                }).then(() => this)
            }
            equals(e) {
                return e && this.id === e.id && this.username === e.username && this.discriminator === e.discriminator && this.avatar === e.avatar
            }
            toString() {
                return `<@${this.id}>`
            }
            toJSON(...e) {
                const t = super.toJSON({
                    createdTimestamp: !0,
                    defaultAvatarURL: !0,
                    tag: !0,
                    lastMessage: !1,
                    lastMessageID: !1
                }, ...e);
                return t.avatarURL = this.avatarURL(), t.displayAvatarURL = this.displayAvatarURL(), t
            }
            send() {}
        }
        i.applyToClass(l), e.exports = l
    }, function(e, t, s) {
        const i = s(7),
            n = s(8),
            r = s(2),
            o = s(6),
            {
                Error: a,
                TypeError: c
            } = s(1);
        e.exports = class extends o {
            constructor(e, t, s) {
                super(e), this.guild = s, t && this._patch(t)
            }
            _patch(e) {
                this.id = e.id, this.name = e.name, this.color = e.color, this.hoist = e.hoist, this.rawPosition = e.position, this.permissions = new n(e.permissions).freeze(), this.managed = e.managed, this.mentionable = e.mentionable
            }
            get createdTimestamp() {
                return i.deconstruct(this.id).timestamp
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            get hexColor() {
                return `#${this.color.toString(16).padStart(6,"0")}`
            }
            get members() {
                return this.guild.members.filter(e => e.roles.has(this.id))
            }
            get editable() {
                if (this.managed) return !1;
                const e = this.guild.member(this.client.user);
                return !!e.permissions.has(n.FLAGS.MANAGE_ROLES) && e.roles.highest.comparePositionTo(this) > 0
            }
            get position() {
                const e = this.guild._sortedRoles();
                return e.array().indexOf(e.get(this.id))
            }
            comparePositionTo(e) {
                return (e = this.guild.roles.resolve(e)) ? this.constructor.comparePositions(this, e) : Promise.reject(new c("INVALID_TYPE", "role", "Role nor a Snowflake"))
            }
            async edit(e, t) {
                return e.permissions ? e.permissions = n.resolve(e.permissions) : e.permissions = this.permissions.bitfield, void 0 !== e.position && await r.setPosition(this, e.position, !1, this.guild._sortedRoles(), this.client.api.guilds(this.guild.id).roles, t).then(e => {
                    this.client.actions.GuildRolesPositionUpdate.handle({
                        guild_id: this.guild.id,
                        roles: e
                    })
                }), this.client.api.guilds[this.guild.id].roles[this.id].patch({
                    data: {
                        name: e.name || this.name,
                        color: null !== e.color ? r.resolveColor(e.color || this.color) : null,
                        hoist: void 0 !== e.hoist ? e.hoist : this.hoist,
                        permissions: e.permissions,
                        mentionable: void 0 !== e.mentionable ? e.mentionable : this.mentionable
                    },
                    reason: t
                }).then(e => {
                    const t = this._clone();
                    return t._patch(e), t
                })
            }
            permissionsIn(e) {
                if (!(e = this.guild.channels.resolve(e))) throw new a("GUILD_CHANNEL_RESOLVE");
                return e.rolePermissions(this)
            }
            setName(e, t) {
                return this.edit({
                    name: e
                }, t)
            }
            setColor(e, t) {
                return this.edit({
                    color: e
                }, t)
            }
            setHoist(e, t) {
                return this.edit({
                    hoist: e
                }, t)
            }
            setPermissions(e, t) {
                return this.edit({
                    permissions: e
                }, t)
            }
            setMentionable(e, t) {
                return this.edit({
                    mentionable: e
                }, t)
            }
            setPosition(e, {
                relative: t,
                reason: s
            } = {}) {
                return r.setPosition(this, e, t, this.guild._sortedRoles(), this.client.api.guilds(this.guild.id).roles, s).then(e => (this.client.actions.GuildRolesPositionUpdate.handle({
                    guild_id: this.guild.id,
                    roles: e
                }), this))
            }
            delete(e) {
                return this.client.api.guilds[this.guild.id].roles[this.id].delete({
                    reason: e
                }).then(() => (this.client.actions.GuildRoleDelete.handle({
                    guild_id: this.guild.id,
                    role_id: this.id
                }), this))
            }
            equals(e) {
                return e && this.id === e.id && this.name === e.name && this.color === e.color && this.hoist === e.hoist && this.position === e.position && this.permissions.bitfield === e.permissions.bitfield && this.managed === e.managed
            }
            toString() {
                return this.id === this.guild.id ? "@everyone" : `<@&${this.id}>`
            }
            toJSON() {
                return super.toJSON({
                    createdTimestamp: !0
                })
            }
            static comparePositions(e, t) {
                return e.position === t.position ? t.id - e.id : e.position - t.position
            }
        }
    }, function(e, t, s) {
        const i = s(15),
            n = s(13),
            r = s(8),
            o = s(69),
            a = s(6),
            {
                Presence: c
            } = s(17),
            {
                Error: l
            } = s(1);
        class h extends a {
            constructor(e, t, s) {
                super(e), this.guild = s, this.user = {}, this.roles = new o(this), t && this._patch(t), this.lastMessageID = null, this.lastMessageChannelID = null
            }
            _patch(e) {
                void 0 === this.speaking && (this.speaking = !1), void 0 !== e.nick && (this.nickname = e.nick), e.joined_at && (this.joinedTimestamp = new Date(e.joined_at).getTime()), this.user = this.guild.client.users.add(e.user), e.roles && this.roles._patch(e.roles)
            }
            _clone() {
                const e = super._clone();
                return e.roles = this.roles.clone(), e
            }
            get lastMessage() {
                const e = this.guild.channels.get(this.lastMessageChannelID);
                return e && e.messages.get(this.lastMessageID) || null
            }
            get voiceState() {
                return this._frozenVoiceState || this.guild.voiceStates.get(this.id) || {}
            }
            get serverDeaf() {
                return this.voiceState.deaf
            }
            get serverMute() {
                return this.voiceState.mute
            }
            get selfMute() {
                return this.voiceState.self_mute
            }
            get selfDeaf() {
                return this.voiceState.self_deaf
            }
            get voiceSessionID() {
                return this.voiceState.session_id
            }
            get voiceChannelID() {
                return this.voiceState.channel_id
            }
            get joinedAt() {
                return new Date(this.joinedTimestamp)
            }
            get presence() {
                return this.frozenPresence || this.guild.presences.get(this.id) || new c(this.client)
            }
            get displayColor() {
                const e = this.roles.color;
                return e && e.color || 0
            }
            get displayHexColor() {
                const e = this.roles.color;
                return e && e.hexColor || "#000000"
            }
            get mute() {
                return this.selfMute || this.serverMute
            }
            get deaf() {
                return this.selfDeaf || this.serverDeaf
            }
            get voiceChannel() {
                return this.guild.channels.get(this.voiceChannelID) || null
            }
            get id() {
                return this.user.id
            }
            get displayName() {
                return this.nickname || this.user.username
            }
            get permissions() {
                return this.user.id === this.guild.ownerID ? new r(r.ALL).freeze() : new r(this.roles.map(e => e.permissions)).freeze()
            }
            get manageable() {
                return this.user.id !== this.guild.ownerID && (this.user.id !== this.client.user.id && this.guild.me.roles.highest.comparePositionTo(this.roles.highest) > 0)
            }
            get kickable() {
                return this.manageable && this.guild.me.permissions.has(r.FLAGS.KICK_MEMBERS)
            }
            get bannable() {
                return this.manageable && this.guild.me.permissions.has(r.FLAGS.BAN_MEMBERS)
            }
            permissionsIn(e) {
                if (!(e = this.guild.channels.resolve(e))) throw new l("GUILD_CHANNEL_RESOLVE");
                return e.memberPermissions(this)
            }
            hasPermission(e, {
                checkAdmin: t = !0,
                checkOwner: s = !0
            } = {}) {
                return !(!s || this.user.id !== this.guild.ownerID) || this.roles.some(s => s.permissions.has(e, t))
            }
            missingPermissions(e, t = !1) {
                return this.permissions.missing(e, t)
            }
            edit(e, t) {
                e.channel && (e.channel_id = this.client.channels.resolve(e.channel).id, e.channel = null), e.roles && (e.roles = e.roles.map(e => e instanceof n ? e.id : e));
                let s = this.client.api.guilds(this.guild.id);
                if (this.user.id === this.client.user.id) {
                    const t = Object.keys(e);
                    s = 1 === t.length && "nick" === t[0] ? s.members("@me").nick : s.members(this.id)
                } else s = s.members(this.id);
                return s.patch({
                    data: e,
                    reason: t
                }).then(() => {
                    const t = this._clone();
                    return e.user = this.user, t._patch(e), t._frozenVoiceState = {}, Object.assign(t._frozenVoiceState, this.voiceState), void 0 !== e.mute && (t._frozenVoiceState.mute = e.mute), void 0 !== e.deaf && (t._frozenVoiceState.mute = e.deaf), void 0 !== e.channel_id && (t._frozenVoiceState.channel_id = e.channel_id), t
                })
            }
            setMute(e, t) {
                return this.edit({
                    mute: e
                }, t)
            }
            setDeaf(e, t) {
                return this.edit({
                    deaf: e
                }, t)
            }
            setVoiceChannel(e) {
                return this.edit({
                    channel: e
                })
            }
            setNickname(e, t) {
                return this.edit({
                    nick: e
                }, t)
            }
            createDM() {
                return this.user.createDM()
            }
            deleteDM() {
                return this.user.deleteDM()
            }
            kick(e) {
                return this.client.api.guilds(this.guild.id).members(this.user.id).delete({
                    reason: e
                }).then(() => this)
            }
            ban(e) {
                return this.guild.members.ban(this, e)
            }
            toString() {
                return `<@${this.nickname?"!":""}${this.user.id}>`
            }
            toJSON() {
                return super.toJSON({
                    guild: "guildID",
                    user: "userID",
                    displayName: !0,
                    speaking: !1,
                    lastMessage: !1,
                    lastMessageID: !1
                })
            }
            send() {}
        }
        i.applyToClass(h), e.exports = h
    }, function(e, t, s) {
        const i = s(71),
            n = s(20),
            r = s(7),
            o = s(4),
            {
                RangeError: a,
                TypeError: c
            } = s(1);
        class l {
            constructor() {
                this.messages = new h(this), this.lastMessageID = null
            }
            get lastMessage() {
                return this.messages.get(this.lastMessageID) || null
            }
            send(e, t) {
                return t || "object" != typeof e || e instanceof Array ? t || (t = {}) : (t = e, e = null), t.content || (t.content = e), n.sendMessage(this, t)
            }
            search(e = {}) {
                return n.search(this, e)
            }
            startTyping(e) {
                if (void 0 !== e && e < 1) throw new a("TYPING_COUNT");
                if (this.client.user._typing.has(this.id)) {
                    const t = this.client.user._typing.get(this.id);
                    return t.count = e || t.count + 1, t.promise
                }
                const t = {};
                return t.promise = new Promise((s, i) => {
                    const n = this.client.api.channels[this.id].typing;
                    Object.assign(t, {
                        count: e || 1,
                        interval: this.client.setInterval(() => {
                            n.post().catch(e => {
                                this.client.clearInterval(t.interval), this.client.user._typing.delete(this.id), i(e)
                            })
                        }, 9e3),
                        resolve: s
                    }), n.post().catch(e => {
                        this.client.clearInterval(t.interval), this.client.user._typing.delete(this.id), i(e)
                    }), this.client.user._typing.set(this.id, t)
                }), t.promise
            }
            stopTyping(e = !1) {
                if (this.client.user._typing.has(this.id)) {
                    const t = this.client.user._typing.get(this.id);
                    t.count--, (t.count <= 0 || e) && (this.client.clearInterval(t.interval), this.client.user._typing.delete(this.id), t.resolve())
                }
            }
            get typing() {
                return this.client.user._typing.has(this.id)
            }
            get typingCount() {
                return this.client.user._typing.has(this.id) ? this.client.user._typing.get(this.id).count : 0
            }
            createMessageCollector(e, t = {}) {
                return new i(this, e, t)
            }
            awaitMessages(e, t = {}) {
                return new Promise((s, i) => {
                    this.createMessageCollector(e, t).once("end", (e, n) => {
                        t.errors && t.errors.includes(n) ? i(e) : s(e)
                    })
                })
            }
            async bulkDelete(e, t = !1) {
                if (e instanceof Array || e instanceof o) {
                    let s = e instanceof o ? e.keyArray() : e.map(e => e.id || e);
                    if (t && (s = s.filter(e => Date.now() - r.deconstruct(e).date.getTime() < 12096e5)), 0 === s.length) return new o;
                    if (1 === s.length) {
                        await this.client.api.channels(this.id).messages(s[0]).delete();
                        const e = this.client.actions.MessageDelete.handle({
                            channel_id: this.id,
                            id: s[0]
                        }).message;
                        return e ? new o([
                            [e.id, e]
                        ]) : new o
                    }
                    return await this.client.api.channels[this.id].messages["bulk-delete"].post({
                        data: {
                            messages: s
                        }
                    }), this.client.actions.MessageDeleteBulk.handle({
                        channel_id: this.id,
                        ids: s
                    }).messages
                }
                if (!isNaN(e)) {
                    const s = await this.messages.fetch({
                        limit: e
                    });
                    return this.bulkDelete(s, t)
                }
                throw new c("MESSAGE_BULK_DELETE_TYPE")
            }
            acknowledge() {
                return this.lastMessageID ? this.client.api.channels[this.id].messages[this.lastMessageID].ack.post({
                    data: {
                        token: this.client.rest._ackToken
                    }
                }).then(e => (e.token && (this.client.rest._ackToken = e.token), this)) : Promise.resolve(this)
            }
            static applyToClass(e, t = !1, s = []) {
                const i = ["send"];
                t && i.push("acknowledge", "lastMessage", "search", "bulkDelete", "startTyping", "stopTyping", "typing", "typingCount", "createMessageCollector", "awaitMessages");
                for (const t of i) s.includes(t) || Object.defineProperty(e.prototype, t, Object.getOwnPropertyDescriptor(l.prototype, t))
            }
        }
        e.exports = l;
        const h = s(18)
    }, function(e, t, s) {
        const i = s(9),
            {
                createMessage: n
            } = s(20);
        class r {
            constructor(e, t) {
                Object.defineProperty(this, "client", {
                    value: e
                }), t && this._patch(t)
            }
            _patch(e) {
                this.name = e.name, this.token = e.token, this.avatar = e.avatar, this.id = e.id, this.guildID = e.guild_id, this.channelID = e.channel_id, e.user ? this.owner = this.client.users ? this.client.users.get(e.user.id) : e.user : this.owner = null
            }
            async send(e, t) {
                t || "object" != typeof e || e instanceof Array ? t || (t = {}) : (t = e, e = null), t.content || (t.content = e);
                const {
                    data: s,
                    files: i
                } = await n(this, t);
                if (s.content instanceof Array) {
                    const e = [];
                    for (let t = 0; t < s.content.length; t++) {
                        const n = t === s.content.length - 1 ? {
                            embeds: s.embeds,
                            files: i
                        } : {};
                        Object.assign(n, {
                            avatarURL: s.avatar_url,
                            content: s.content[t],
                            username: s.username
                        });
                        const r = await this.send(s.content[t], n);
                        e.push(r)
                    }
                    return e
                }
                return this.client.api.webhooks(this.id, this.token).post({
                    data: s,
                    files: i,
                    query: {
                        wait: !0
                    },
                    auth: !1
                }).then(e => this.client.channels ? this.client.channels.get(e.channel_id).messages.add(e, !1) : e)
            }
            sendSlackMessage(e) {
                return this.client.api.webhooks(this.id, this.token).slack.post({
                    query: {
                        wait: !0
                    },
                    auth: !1,
                    data: e
                }).then(e => this.client.channels ? this.client.channels.get(e.channel_id).messages.add(e, !1) : e)
            }
            edit({
                name: e = this.name,
                avatar: t,
                channel: s
            }, n) {
                return t && "string" == typeof t && !t.startsWith("data:") ? i.resolveImage(t).then(t => this.edit({
                    name: e,
                    avatar: t
                }, n)) : (s && (s = this.client.channels.resolveID(s)), this.client.api.webhooks(this.id, s ? void 0 : this.token).patch({
                    data: {
                        name: e,
                        avatar: t,
                        channel_id: s
                    },
                    reason: n
                }).then(e => (this.name = e.name, this.avatar = e.avatar, this.channelID = e.channel_id, this)))
            }
            delete(e) {
                return this.client.api.webhooks(this.id, this.token).delete({
                    reason: e
                })
            }
            static applyToClass(e) {
                for (const t of ["send", "sendSlackMessage", "edit", "delete"]) Object.defineProperty(e.prototype, t, Object.getOwnPropertyDescriptor(r.prototype, t))
            }
        }
        e.exports = r
    }, function(e, t, s) {
        const i = s(2),
            {
                ActivityTypes: n,
                ActivityFlags: r
            } = s(3);
        class o {
            constructor(e, t) {
                Object.defineProperty(this, "presence", {
                    value: e
                }), this.name = t.name, this.type = n[t.type], this.url = t.url || null, this.details = t.details || null, this.state = t.state || null, this.applicationID = t.application_id || null, this.timestamps = t.timestamps ? {
                    start: t.timestamps.start ? new Date(Number(t.timestamps.start)) : null,
                    end: t.timestamps.end ? new Date(Number(t.timestamps.end)) : null
                } : null, this.party = t.party || null, this.assets = t.assets ? new a(this, t.assets) : null, this.syncID = t.sync_id, this._flags = t.flags
            }
            get flags() {
                const e = [];
                for (const [t, s] of Object.entries(r))(this._flags & s) === s && e.push(t);
                return e
            }
            equals(e) {
                return this === e || e && this.name === e.name && this.type === e.type && this.url === e.url
            }
            toString() {
                return this.name
            }
            _clone() {
                return Object.assign(Object.create(this), this)
            }
        }
        class a {
            constructor(e, t) {
                Object.defineProperty(this, "activity", {
                    value: e
                }), this.largeText = t.large_text || null, this.smallText = t.small_text || null, this.largeImage = t.large_image || null, this.smallImage = t.small_image || null
            }
            smallImageURL({
                format: e,
                size: t
            } = {}) {
                return this.smallImage ? this.activity.presence.client.rest.cdn.AppAsset(this.activity.applicationID, this.smallImage, {
                    format: e,
                    size: t
                }) : null
            }
            largeImageURL({
                format: e,
                size: t
            } = {}) {
                return this.largeImage ? /^spotify:/.test(this.largeImage) ? `https://i.scdn.co/image/${this.largeImage.slice(8)}` : this.activity.presence.client.rest.cdn.AppAsset(this.activity.applicationID, this.largeImage, {
                    format: e,
                    size: t
                }) : null
            }
        }
        t.Presence = class {
            constructor(e, t = {}) {
                Object.defineProperty(this, "client", {
                    value: e
                }), this.patch(t)
            }
            patch(e) {
                this.status = e.status || this.status || "offline";
                const t = e.game || e.activity;
                return this.activity = t ? new o(this, t) : null, this
            }
            _clone() {
                const e = Object.assign(Object.create(this), this);
                return this.activity && (e.activity = this.activity._clone()), e
            }
            equals(e) {
                return this === e || (e && this.status === e.status && this.activity ? this.activity.equals(e.activity) : !e.activity)
            }
            toJSON() {
                return i.flatten(this)
            }
        }, t.Activity = o, t.RichPresenceAssets = a
    }, function(e, t, s) {
        const i = s(5),
            n = s(4),
            r = s(32),
            {
                Error: o
            } = s(1);
        e.exports = class extends i {
            constructor(e, t) {
                super(e.client, t, r), this.channel = e
            }
            add(e, t) {
                return super.add(e, t, {
                    extras: [this.channel]
                })
            }
            set(e, t) {
                const s = this.client.options.messageCacheMaxSize;
                0 !== s && (this.size >= s && s > 0 && this.delete(this.firstKey()), super.set(e, t))
            }
            fetch(e) {
                return "string" == typeof e ? this._fetchId(e) : this._fetchMany(e)
            }
            fetchPinned() {
                return this.client.api.channels[this.channel.id].pins.get().then(e => {
                    const t = new n;
                    for (const s of e) t.set(s.id, this.add(s));
                    return t
                })
            }
            async _fetchId(e) {
                if (!this.client.user.bot) {
                    const t = (await this._fetchMany({
                        limit: 1,
                        around: e
                    })).get(e);
                    if (!t) throw new o("MESSAGE_MISSING");
                    return t
                }
                const t = await this.client.api.channels[this.channel.id].messages[e].get();
                return this.add(t)
            }
            async _fetchMany(e = {}) {
                const t = await this.client.api.channels[this.channel.id].messages.get({
                        query: e
                    }),
                    s = new n;
                for (const e of t) s.set(e.id, this.add(e));
                return s
            }
        }
    }, function(e, t, s) {
        const i = s(73),
            n = s(7),
            r = s(34);
        class o extends r {
            constructor(e, t, s) {
                super(e, t), this.guild = s, this.roles = new i(this), this._patch(t)
            }
            _patch(e) {
                this.name = e.name, this.requiresColons = e.require_colons, this.managed = e.managed, e.roles && this.roles._patch(e.roles)
            }
            _clone() {
                const e = super._clone();
                return e.roles = this.roles.clone(), e
            }
            get createdTimestamp() {
                return n.deconstruct(this.id).timestamp
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            fetchAuthor() {
                return this.client.api.guilds(this.guild.id).emojis(this.id).get().then(e => this.client.users.add(e.user))
            }
            edit(e, t) {
                return this.client.api.guilds(this.guild.id).emojis(this.id).patch({
                    data: {
                        name: e.name,
                        roles: e.roles ? e.roles.map(e => e.id ? e.id : e) : void 0
                    },
                    reason: t
                }).then(() => {
                    const t = this._clone();
                    return t._patch(e), t
                })
            }
            setName(e, t) {
                return this.edit({
                    name: e
                }, t)
            }
            delete(e) {
                return this.client.api.guilds(this.guild.id).emojis(this.id).delete({
                    reason: e
                }).then(() => this)
            }
            equals(e) {
                return e instanceof o ? e.id === this.id && e.name === this.name && e.managed === this.managed && e.requiresColons === this.requiresColons && e.roles.size === this.roles.size && e.roles.every(e => this.roles.has(e.id)) : e.id === this.id && e.name === this.name && e.roles.length === this.roles.size && e.roles.every(e => this.roles.has(e))
            }
        }
        e.exports = o
    }, function(e, t, s) {
        e.exports = {
            search: s(74),
            sendMessage: s(58),
            createMessage: s(28)
        }
    }, function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "version", function() {
            return n
        }), s.d(t, "METHODS", function() {
            return r
        }), s.d(t, "acl", function() {
            return o
        }), s.d(t, "bind", function() {
            return a
        }), s.d(t, "checkout", function() {
            return c
        }), s.d(t, "connect", function() {
            return l
        }), s.d(t, "copy", function() {
            return h
        }), s.d(t, "delete", function() {
            return u
        }), s.d(t, "get", function() {
            return d
        }), s.d(t, "head", function() {
            return p
        }), s.d(t, "link", function() {
            return m
        }), s.d(t, "lock", function() {
            return f
        }), s.d(t, "merge", function() {
            return E
        }), s.d(t, "mkactivity", function() {
            return g
        }), s.d(t, "mkcalendar", function() {
            return _
        }), s.d(t, "mkcol", function() {
            return T
        }), s.d(t, "move", function() {
            return I
        }), s.d(t, "notify", function() {
            return y
        }), s.d(t, "options", function() {
            return A
        }), s.d(t, "patch", function() {
            return v
        }), s.d(t, "post", function() {
            return N
        }), s.d(t, "propfind", function() {
            return S
        }), s.d(t, "proppatch", function() {
            return D
        }), s.d(t, "purge", function() {
            return b
        }), s.d(t, "put", function() {
            return w
        }), s.d(t, "rebind", function() {
            return O
        }), s.d(t, "report", function() {
            return C
        }), s.d(t, "search", function() {
            return R
        }), s.d(t, "subscribe", function() {
            return L
        }), s.d(t, "trace", function() {
            return M
        }), s.d(t, "unbind", function() {
            return U
        }), s.d(t, "unlink", function() {
            return P
        }), s.d(t, "unlock", function() {
            return x
        }), s.d(t, "unsubscribe", function() {
            return G
        }), s.d(t, "brew", function() {
            return k
        });
        var i = s(0);
        t.default = i;
        const n = i.version,
            r = i.METHODS,
            o = i.acl,
            a = i.bind,
            c = i.checkout,
            l = i.connect,
            h = i.copy,
            u = i.delete,
            d = i.get,
            p = i.head,
            m = i.link,
            f = i.lock,
            E = i.merge,
            g = i.mkactivity,
            _ = i.mkcalendar,
            T = i.mkcol,
            I = i.move,
            y = i.notify,
            A = i.options,
            v = i.patch,
            N = i.post,
            S = i.propfind,
            D = i.proppatch,
            b = i.purge,
            w = i.put,
            O = i.rebind,
            C = i.report,
            R = i.search,
            L = i.subscribe,
            M = i.trace,
            U = i.unbind,
            P = i.unlink,
            x = i.unlock,
            G = i.unsubscribe,
            k = i.brew
    }, function(e, t, s) {
        const i = s(23),
            n = s(2),
            {
                RangeError: r
            } = s(1);
        e.exports = class {
            constructor(e = {}) {
                this.setup(e)
            }
            setup(e) {
                this.type = e.type, this.title = e.title, this.description = e.description, this.url = e.url, this.color = e.color, this.timestamp = e.timestamp ? new Date(e.timestamp).getTime() : null, this.fields = e.fields ? e.fields.map(n.cloneObject) : [], this.thumbnail = e.thumbnail ? {
                    url: e.thumbnail.url,
                    proxyURL: e.thumbnail.proxy_url,
                    height: e.thumbnail.height,
                    width: e.thumbnail.width
                } : null, this.image = e.image ? {
                    url: e.image.url,
                    proxyURL: e.image.proxy_url,
                    height: e.image.height,
                    width: e.image.width
                } : null, this.video = e.video, this.author = e.author ? {
                    name: e.author.name,
                    url: e.author.url,
                    iconURL: e.author.iconURL || e.author.icon_url,
                    proxyIconURL: e.author.proxyIconUrl || e.author.proxy_icon_url
                } : null, this.provider = e.provider, this.footer = e.footer ? {
                    text: e.footer.text,
                    iconURL: e.footer.iconURL || e.footer.icon_url,
                    proxyIconURL: e.footer.proxyIconURL || e.footer.proxy_icon_url
                } : null, e.files && (this.files = e.files.map(e => e instanceof i ? "string" == typeof e.file ? e.file : n.cloneObject(e.file) : e))
            }
            get createdAt() {
                return this.timestamp ? new Date(this.timestamp) : null
            }
            get hexColor() {
                return this.color ? `#${this.color.toString(16).padStart(6,"0")}` : null
            }
            addField(e, t, s = !1) {
                if (this.fields.length >= 25) throw new r("EMBED_FIELD_COUNT");
                if (e = n.resolveString(e), !String(e)) throw new r("EMBED_FIELD_NAME");
                if (t = n.resolveString(t), !String(t)) throw new r("EMBED_FIELD_VALUE");
                return this.fields.push({
                    name: e,
                    value: t,
                    inline: s
                }), this
            }
            addBlankField(e = !1) {
                return this.addField("​", "​", e)
            }
            attachFiles(e) {
                this.files ? this.files = this.files.concat(e) : this.files = e;
                for (let t of e) t instanceof i && (t = t.file);
                return this
            }
            setAuthor(e, t, s) {
                return this.author = {
                    name: n.resolveString(e),
                    iconURL: t,
                    url: s
                }, this
            }
            setColor(e) {
                return this.color = n.resolveColor(e), this
            }
            setDescription(e) {
                return e = n.resolveString(e), this.description = e, this
            }
            setFooter(e, t) {
                return e = n.resolveString(e), this.footer = {
                    text: e,
                    iconURL: t
                }, this
            }
            setImage(e) {
                return this.image = {
                    url: e
                }, this
            }
            setThumbnail(e) {
                return this.thumbnail = {
                    url: e
                }, this
            }
            setTimestamp(e = new Date) {
                return this.timestamp = e.getTime(), this
            }
            setTitle(e) {
                return e = n.resolveString(e), this.title = e, this
            }
            setURL(e) {
                return this.url = e, this
            }
            toJSON() {
                return n.flatten(this, {
                    hexColor: !0
                })
            }
            _apiTransform() {
                return {
                    title: this.title,
                    type: "rich",
                    description: this.description,
                    url: this.url,
                    timestamp: this.timestamp ? new Date(this.timestamp) : null,
                    color: this.color,
                    fields: this.fields,
                    thumbnail: this.thumbnail,
                    image: this.image,
                    author: this.author ? {
                        name: this.author.name,
                        url: this.author.url,
                        icon_url: this.author.iconURL
                    } : null,
                    footer: this.footer ? {
                        text: this.footer.text,
                        icon_url: this.footer.iconURL
                    } : null
                }
            }
        }
    }, function(e, t, s) {
        const i = s(2);
        e.exports = class {
            constructor(e, t, s) {
                this.file = null, s && this._patch(s), t ? this.setAttachment(e, t) : this._attach(e)
            }
            get name() {
                return this.file.name
            }
            get attachment() {
                return this.file.attachment
            }
            setAttachment(e, t) {
                return this.file = {
                    attachment: e,
                    name: t
                }, this
            }
            setFile(e) {
                return this.file = {
                    attachment: e
                }, this
            }
            setName(e) {
                return this.file.name = e, this
            }
            _attach(e, t) {
                "string" == typeof e ? this.file = e : this.setAttachment(e, t)
            }
            _patch(e) {
                this.id = e.id, this.size = e.size, this.url = e.url, this.proxyURL = e.proxy_url, this.height = e.height, this.width = e.width
            }
            toJSON() {
                return i.flatten(this)
            }
        }
    }, function(e, t, s) {
        const i = s(36),
            n = s(75),
            r = s(16),
            o = s(47),
            {
                ChannelTypes: a,
                Events: c,
                browser: l
            } = s(3),
            h = s(4),
            u = s(2),
            d = s(9),
            p = s(7),
            m = s(20),
            f = s(46),
            E = s(45),
            g = s(44),
            _ = s(43),
            T = s(42),
            I = s(6),
            {
                Error: y,
                TypeError: A
            } = s(1);
        class v extends h {
            constructor(e) {
                super(), this.guild = e
            }
            set(e, t) {
                const s = this.guild.members.get(e);
                if (s) {
                    s.voiceChannel && s.voiceChannel.id !== t.channel_id && s.voiceChannel.members.delete(s.id), t.channel_id || (s.speaking = null);
                    const e = this.guild.channels.get(t.channel_id);
                    e && e.members.set(s.user.id, s)
                }
                super.set(e, t)
            }
            delete(e) {
                const t = this.get(e);
                if (t && t.channel_id) {
                    const s = this.guild.channels.get(t.channel_id);
                    s && s.members.delete(e)
                }
                return super.delete(e)
            }
        }
        e.exports = class extends I {
            constructor(e, t) {
                super(e), this.members = new f(this), this.channels = new _(this), this.roles = new E(this), this.presences = new T(this.client), t && (t.unavailable ? (this.available = !1, this.id = t.id) : (this._patch(t), t.channels || (this.available = !1)))
            }
            _patch(e) {
                if (this.name = e.name, this.icon = e.icon, this.splash = e.splash, this.region = e.region, this.memberCount = e.member_count || this.memberCount, this.large = Boolean("large" in e ? e.large : this.large), this.features = e.features, this.applicationID = e.application_id, this.afkTimeout = e.afk_timeout, this.afkChannelID = e.afk_channel_id, this.systemChannelID = e.system_channel_id, this.embedEnabled = e.embed_enabled, this.verificationLevel = e.verification_level, this.explicitContentFilter = e.explicit_content_filter, this.mfaLevel = e.mfa_level, this.joinedTimestamp = e.joined_at ? new Date(e.joined_at).getTime() : this.joinedTimestamp, this.id = e.id, this.available = !e.unavailable, this.features = e.features || this.features || [], e.channels) {
                    this.channels.clear();
                    for (const t of e.channels) this.client.channels.add(t, this)
                }
                if (e.roles) {
                    this.roles.clear();
                    for (const t of e.roles) this.roles.add(t)
                }
                if (e.members) {
                    this.members.clear();
                    for (const t of e.members) this.members.add(t)
                }
                if (e.owner_id && (this.ownerID = e.owner_id), e.presences)
                    for (const t of e.presences) this.presences.add(t);
                if (this.voiceStates || (this.voiceStates = new v(this)), e.voice_states)
                    for (const t of e.voice_states) this.voiceStates.set(t.user_id, t);
                if (this.emojis) this.client.actions.GuildEmojisUpdate.handle({
                    guild_id: this.id,
                    emojis: e.emojis
                });
                else if (this.emojis = new g(this), e.emojis)
                    for (const t of e.emojis) this.emojis.add(t)
            }
            get createdTimestamp() {
                return p.deconstruct(this.id).timestamp
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            get joinedAt() {
                return new Date(this.joinedTimestamp)
            }
            get verified() {
                return this.features.includes("VERIFIED")
            }
            iconURL({
                format: e,
                size: t
            } = {}) {
                return this.icon ? this.client.rest.cdn.Icon(this.id, this.icon, e, t) : null
            }
            get nameAcronym() {
                return this.name.replace(/\w+/g, e => e[0]).replace(/\s/g, "")
            }
            splashURL({
                format: e,
                size: t
            } = {}) {
                return this.splash ? this.client.rest.cdn.Splash(this.id, this.splash, e, t) : null
            }
            get owner() {
                return this.members.get(this.ownerID) || null
            }
            get afkChannel() {
                return this.client.channels.get(this.afkChannelID) || null
            }
            get systemChannel() {
                return this.client.channels.get(this.systemChannelID) || null
            }
            get voiceConnection() {
                return l ? null : this.client.voice.connections.get(this.id) || null
            }
            get position() {
                return this.client.user.bot ? null : this.client.user.settings.guildPositions ? this.client.user.settings.guildPositions.indexOf(this.id) : null
            }
            get muted() {
                if (this.client.user.bot) return null;
                try {
                    return this.client.user.guildSettings.get(this.id).muted
                } catch (e) {
                    return !1
                }
            }
            get messageNotifications() {
                if (this.client.user.bot) return null;
                try {
                    return this.client.user.guildSettings.get(this.id).messageNotifications
                } catch (e) {
                    return null
                }
            }
            get mobilePush() {
                if (this.client.user.bot) return null;
                try {
                    return this.client.user.guildSettings.get(this.id).mobilePush
                } catch (e) {
                    return !1
                }
            }
            get suppressEveryone() {
                if (this.client.user.bot) return null;
                try {
                    return this.client.user.guildSettings.get(this.id).suppressEveryone
                } catch (e) {
                    return null
                }
            }
            get defaultRole() {
                return this.roles.get(this.id) || null
            }
            get me() {
                return this.members.get(this.client.user.id) || null
            }
            member(e) {
                return this.members.resolve(e)
            }
            fetchBans() {
                return this.client.api.guilds(this.id).bans.get().then(e => e.reduce((e, t) => (e.set(t.user.id, {
                    reason: t.reason,
                    user: this.client.users.add(t.user)
                }), e), new h))
            }
            fetchInvites() {
                return this.client.api.guilds(this.id).invites.get().then(e => {
                    const t = new h;
                    for (const s of e) {
                        const e = new i(this.client, s);
                        t.set(e.code, e)
                    }
                    return t
                })
            }
            fetchWebhooks() {
                return this.client.api.guilds(this.id).webhooks.get().then(e => {
                    const t = new h;
                    for (const s of e) t.set(s.id, new r(this.client, s));
                    return t
                })
            }
            fetchVoiceRegions() {
                return this.client.api.guilds(this.id).regions.get().then(e => {
                    const t = new h;
                    for (const s of e) t.set(s.id, new o(s));
                    return t
                })
            }
            fetchAuditLogs(e = {}) {
                return e.before && e.before instanceof n.Entry && (e.before = e.before.id), e.after && e.after instanceof n.Entry && (e.after = e.after.id), "string" == typeof e.type && (e.type = n.Actions[e.type]), this.client.api.guilds(this.id)["audit-logs"].get({
                    query: {
                        before: e.before,
                        after: e.after,
                        limit: e.limit,
                        user_id: this.client.users.resolveID(e.user),
                        action_type: e.type
                    }
                }).then(e => n.build(this, e))
            }
            addMember(e, t) {
                if (!(e = this.client.users.resolveID(e))) return Promise.reject(new A("INVALID_TYPE", "user", "UserResolvable"));
                if (this.members.has(e)) return Promise.resolve(this.members.get(e));
                if (t.access_token = t.accessToken, t.roles) {
                    const e = [];
                    for (let s of t.roles instanceof h ? t.roles.values() : t.roles) {
                        if (!(s = this.roles.resolve(s))) return Promise.reject(new A("INVALID_TYPE", "options.roles", "Array or Collection of Roles or Snowflakes", !0));
                        e.push(s.id)
                    }
                }
                return this.client.api.guilds(this.id).members(e).put({
                    data: t
                }).then(e => this.members.add(e))
            }
            search(e = {}) {
                return m.search(this, e)
            }
            edit(e, t) {
                const s = {};
                return e.name && (s.name = e.name), e.region && (s.region = e.region), void 0 !== e.verificationLevel && (s.verification_level = Number(e.verificationLevel)), void 0 !== e.afkChannel && (s.afk_channel_id = this.client.channels.resolveID(e.afkChannel)), void 0 !== e.systemChannel && (s.system_channel_id = this.client.channels.resolveID(e.systemChannel)), e.afkTimeout && (s.afk_timeout = Number(e.afkTimeout)), void 0 !== e.icon && (s.icon = e.icon), e.owner && (s.owner_id = this.client.users.resolve(e.owner).id), e.splash && (s.splash = e.splash), void 0 !== e.explicitContentFilter && (s.explicit_content_filter = Number(e.explicitContentFilter)), this.client.api.guilds(this.id).patch({
                    data: s,
                    reason: t
                }).then(e => this.client.actions.GuildUpdate.handle(e).updated)
            }
            setExplicitContentFilter(e, t) {
                return this.edit({
                    explicitContentFilter: e
                }, t)
            }
            setName(e, t) {
                return this.edit({
                    name: e
                }, t)
            }
            setRegion(e, t) {
                return this.edit({
                    region: e
                }, t)
            }
            setVerificationLevel(e, t) {
                return this.edit({
                    verificationLevel: e
                }, t)
            }
            setAFKChannel(e, t) {
                return this.edit({
                    afkChannel: e
                }, t)
            }
            setSystemChannel(e, t) {
                return this.edit({
                    systemChannel: e
                }, t)
            }
            setAFKTimeout(e, t) {
                return this.edit({
                    afkTimeout: e
                }, t)
            }
            async setIcon(e, t) {
                return this.edit({
                    icon: await d.resolveImage(e),
                    reason: t
                })
            }
            setOwner(e, t) {
                return this.edit({
                    owner: e
                }, t)
            }
            async setSplash(e, t) {
                return this.edit({
                    splash: await d.resolveImage(e),
                    reason: t
                })
            }
            setPosition(e, t) {
                return this.client.user.bot ? Promise.reject(new y("FEATURE_USER_ONLY")) : this.client.user.settings.setGuildPosition(this, e, t)
            }
            acknowledge() {
                return this.client.api.guilds(this.id).ack.post({
                    data: {
                        token: this.client.rest._ackToken
                    }
                }).then(e => (e.token && (this.client.rest._ackToken = e.token), this))
            }
            allowDMs(e) {
                if (this.client.user.bot) return Promise.reject(new y("FEATURE_USER_ONLY"));
                const t = this.client.user.settings;
                return e ? t.removeRestrictedGuild(this) : t.addRestrictedGuild(this)
            }
            sync() {
                this.client.user.bot || this.client.syncGuilds([this])
            }
            setChannelPositions(e) {
                const t = e.map(e => ({
                    id: this.client.channels.resolveID(e.channel),
                    position: e.position
                }));
                return this.client.api.guilds(this.id).channels.patch({
                    data: t
                }).then(() => this.client.actions.GuildChannelsPositionUpdate.handle({
                    guild_id: this.id,
                    channels: t
                }).guild)
            }
            leave() {
                return this.ownerID === this.client.user.id ? Promise.reject(new y("GUILD_OWNED")) : this.client.api.users("@me").guilds(this.id).delete().then(() => this.client.actions.GuildDelete.handle({
                    id: this.id
                }).guild)
            }
            delete() {
                return this.client.api.guilds(this.id).delete().then(() => this.client.actions.GuildDelete.handle({
                    id: this.id
                }).guild)
            }
            equals(e) {
                let t = e && e instanceof this.constructor && this.id === e.id && this.available === e.available && this.splash === e.splash && this.region === e.region && this.name === e.name && this.memberCount === e.memberCount && this.large === e.large && this.icon === e.icon && u.arraysEqual(this.features, e.features) && this.ownerID === e.ownerID && this.verificationLevel === e.verificationLevel && this.embedEnabled === e.embedEnabled;
                return t && (this.embedChannel ? e.embedChannel && this.embedChannel.id === e.embedChannel.id || (t = !1) : e.embedChannel && (t = !1)), t
            }
            toString() {
                return this.name
            }
            toJSON() {
                const e = super.toJSON({
                    available: !1,
                    createdTimestamp: !0,
                    nameAcronym: !0,
                    presences: !1,
                    voiceStates: !1
                });
                return e.iconURL = this.iconURL(), e.splashURL = this.splashURL(), e
            }
            _sortedRoles() {
                return u.discordSort(this.roles)
            }
            _sortedChannels(e) {
                const t = e.type === a.CATEGORY;
                return u.discordSort(this.channels.filter(s => s.type === e.type && (t || s.parent === e.parent)))
            }
            _memberSpeakUpdate(e, t) {
                const s = this.members.get(e);
                s && s.speaking !== t && (s.speaking = t, this.client.emit(c.GUILD_MEMBER_SPEAKING, s, t))
            }
        }
    }, function(e, t) {
        function s() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function i(e) {
            return "function" == typeof e
        }

        function n(e) {
            return "object" == typeof e && null !== e
        }

        function r(e) {
            return void 0 === e
        }
        e.exports = s, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._maxListeners = void 0, s.defaultMaxListeners = 10, s.prototype.setMaxListeners = function(e) {
            if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, s.prototype.emit = function(e) {
            var t, s, o, a, c, l;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
                if ((t = arguments[1]) instanceof Error) throw t;
                var h = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                throw h.context = t, h
            }
            if (r(s = this._events[e])) return !1;
            if (i(s)) switch (arguments.length) {
                case 1:
                    s.call(this);
                    break;
                case 2:
                    s.call(this, arguments[1]);
                    break;
                case 3:
                    s.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    a = Array.prototype.slice.call(arguments, 1), s.apply(this, a)
            } else if (n(s))
                for (a = Array.prototype.slice.call(arguments, 1), o = (l = s.slice()).length, c = 0; c < o; c++) l[c].apply(this, a);
            return !0
        }, s.prototype.addListener = function(e, t) {
            var o;
            if (!i(t)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? n(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, n(this._events[e]) && !this._events[e].warned && (o = r(this._maxListeners) ? s.defaultMaxListeners : this._maxListeners) && o > 0 && this._events[e].length > o && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
        }, s.prototype.on = s.prototype.addListener, s.prototype.once = function(e, t) {
            if (!i(t)) throw TypeError("listener must be a function");
            var s = !1;

            function n() {
                this.removeListener(e, n), s || (s = !0, t.apply(this, arguments))
            }
            return n.listener = t, this.on(e, n), this
        }, s.prototype.removeListener = function(e, t) {
            var s, r, o, a;
            if (!i(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (o = (s = this._events[e]).length, r = -1, s === t || i(s.listener) && s.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (n(s)) {
                for (a = o; a-- > 0;)
                    if (s[a] === t || s[a].listener && s[a].listener === t) {
                        r = a;
                        break
                    }
                if (r < 0) return this;
                1 === s.length ? (s.length = 0, delete this._events[e]) : s.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, s.prototype.removeAllListeners = function(e) {
            var t, s;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (i(s = this._events[e])) this.removeListener(e, s);
            else if (s)
                for (; s.length;) this.removeListener(e, s[s.length - 1]);
            return delete this._events[e], this
        }, s.prototype.listeners = function(e) {
            return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, s.prototype.listenerCount = function(e) {
            if (this._events) {
                var t = this._events[e];
                if (i(t)) return 1;
                if (t) return t.length
            }
            return 0
        }, s.listenerCount = function(e, t) {
            return e.listenerCount(t)
        }
    }, function(e, t, s) {
        "use strict";
        t.decode = t.parse = s(88), t.encode = t.stringify = s(87)
    }, function(e, t, s) {
        const i = s(25),
            n = s(56),
            r = s(2),
            {
                DefaultOptions: o
            } = s(3);
        e.exports = class extends i {
            constructor(e = {}) {
                super(), this.options = r.mergeDefault(o, e), this.rest = new n(this, e._tokenType), this._timeouts = new Set, this._intervals = new Set
            }
            get api() {
                return this.rest.api
            }
            destroy() {
                for (const e of this._timeouts) clearTimeout(e);
                for (const e of this._intervals) clearInterval(e);
                this._timeouts.clear(), this._intervals.clear()
            }
            setTimeout(e, t, ...s) {
                const i = setTimeout(() => {
                    e(...s), this._timeouts.delete(i)
                }, t);
                return this._timeouts.add(i), i
            }
            clearTimeout(e) {
                clearTimeout(e), this._timeouts.delete(e)
            }
            setInterval(e, t, ...s) {
                const i = setInterval(e, t, ...s);
                return this._intervals.add(i), i
            }
            clearInterval(e) {
                clearInterval(e), this._intervals.delete(e)
            }
            toJSON(...e) {
                return r.flatten(this, {
                    domain: !1
                }, ...e)
            }
        }
    }, function(e, t, s) {
        const i = s(22),
            n = s(9),
            r = s(22),
            o = s(23),
            {
                browser: a
            } = s(3),
            c = s(2),
            {
                RangeError: l
            } = s(1);
        e.exports = async function(e, t) {
            const h = s(12),
                u = s(14),
                d = s(16),
                p = s(57),
                m = e instanceof d || e instanceof p;
            if (void 0 !== t.nonce && (t.nonce = parseInt(t.nonce), isNaN(t.nonce) || t.nonce < 0)) throw new l("MESSAGE_NONCE_TYPE");
            let f, {
                content: E
            } = t;
            if (t instanceof r && (t = m ? {
                    embeds: [t]
                } : {
                    embed: t
                }), t instanceof o && (t = {
                    files: [t.file]
                }), E instanceof Array || t instanceof Array) {
                const e = E instanceof Array ? E : t,
                    s = e.filter(e => e instanceof o),
                    i = e.filter(e => e instanceof r);
                s.length && (t = {
                    files: s
                }), i.length && (t = {
                    embeds: i
                }), (i.length || s.length) && E instanceof Array && (E = null, t.content = "")
            }
            if (t.reply && !(e instanceof h || e instanceof u) && "dm" !== e.type) {
                const s = e.client.users.resolveID(t.reply),
                    i = `<@${t.reply instanceof u&&t.reply.nickname?"!":""}${s}>`;
                t.split && (t.split.prepend = `${i}, ${t.split.prepend||""}`), E = `${i}${void 0!==t.content?`, ${t.content}`:""}`
            }
            if (E && (t.content = c.resolveString(E), t.split && "object" != typeof t.split && (t.split = {}), void 0 === t.code || "boolean" == typeof t.code && !0 !== t.code || (t.content = c.escapeMarkdown(t.content, !0), t.content = `\`\`\`${"boolean"!=typeof t.code&&t.code||""}\n${t.content}\n\`\`\``, t.split && (t.split.prepend = `\`\`\`${"boolean"!=typeof t.code&&t.code||""}\n`, t.split.append = "\n```")), (t.disableEveryone || void 0 === t.disableEveryone && e.client.options.disableEveryone) && (t.content = t.content.replace(/@(everyone|here)/g, "@​$1")), t.split && (t.content = c.splitMessage(t.content, t.split))), t.embed && t.embed.files && (t.files ? t.files = t.files.concat(t.embed.files) : t.files = t.embed.files), t.embed && m ? t.embeds = [new i(t.embed)._apiTransform()] : t.embed ? t.embed = new i(t.embed)._apiTransform() : t.embeds && (t.embeds = t.embeds.map(e => new i(e)._apiTransform())), t.files) {
                for (let e = 0; e < t.files.length; e++) {
                    let s = t.files[e];
                    ("string" == typeof s || !a && Buffer.isBuffer(s)) && (s = {
                        attachment: s
                    }), s.name ? s instanceof o && (s = s.file) : "string" == typeof s.attachment ? s.name = c.basename(s.attachment) : s.attachment && s.attachment.path ? s.name = c.basename(s.attachment.path) : s instanceof o ? s = {
                        attachment: s.file,
                        name: c.basename(s.file) || "file.jpg"
                    } : s.name = "file.jpg", t.files[e] = s
                }
                f = await Promise.all(t.files.map(e => n.resolveFile(e.attachment).then(t => (e.file = t, e))))
            }
            return m && (t.username || (t.username = this.name), t.avatarURL && (t.avatar_url = t.avatarURL)), {
                data: {
                    content: t.content,
                    tts: t.tts,
                    nonce: t.nonce,
                    embed: t.embed,
                    embeds: t.embeds,
                    username: t.username,
                    avatar_url: t.avatar_url
                },
                files: f
            }
        }
    }, function(e, t, s) {
        const i = s(8),
            n = s(4);
        e.exports = function(e) {
            return (e instanceof n || e instanceof Array) && (e = e.map(e => {
                const t = this.guild.roles.resolve(e.id);
                return t ? (e.id = t.id, e.type = "role") : (e.id = this.client.users.resolveID(e.id), e.type = "member"), {
                    allow: i.resolve(e.allowed || 0),
                    deny: i.resolve(e.denied || 0),
                    type: e.type,
                    id: e.id
                }
            })), e
        }
    }, function(e, t, s) {
        const i = s(2),
            n = s(34);
        e.exports = class extends n {
            constructor(e, t) {
                super(e.message.client, t), this.reaction = e
            }
            toJSON() {
                return i.flatten(this, {
                    identifier: !0
                })
            }
            valueOf() {
                return this.id
            }
        }
    }, function(e, t, s) {
        const i = s(19),
            n = s(2),
            r = s(30),
            o = s(66);
        e.exports = class {
            constructor(e, t, s) {
                this.message = s, this.me = t.me, this.count = t.count || 0, this.users = new o(e, void 0, this), this._emoji = new r(this, t.emoji)
            }
            get emoji() {
                if (this._emoji instanceof i) return this._emoji;
                if (this._emoji.id) {
                    const e = this.message.client.emojis;
                    if (e.has(this._emoji.id)) {
                        const t = e.get(this._emoji.id);
                        return this._emoji = t, t
                    }
                }
                return this._emoji
            }
            toJSON() {
                return n.flatten(this, {
                    emoji: "emojiID",
                    message: "messageID"
                })
            }
            _add(e) {
                this.users.set(e.id, e), this.me && e.id === this.message.client.user.id && 0 !== this.count || this.count++, this.me || (this.me = e.id === this.message.client.user.id)
            }
            _remove(e) {
                this.users.delete(e.id), this.me && e.id === this.message.client.user.id || this.count--, e.id === this.message.client.user.id && (this.me = !1), this.count <= 0 && this.message.reactions.remove(this.emoji.id || this.emoji.name)
            }
        }
    }, function(e, t, s) {
        const i = s(70),
            n = s(23),
            r = s(22),
            o = s(68),
            a = s(38),
            c = s(2),
            l = s(4),
            h = s(67),
            {
                MessageTypes: u
            } = s(3),
            d = s(8),
            p = s(6),
            {
                Error: m,
                TypeError: f
            } = s(1),
            {
                createMessage: E
            } = s(20);
        e.exports = class extends p {
            constructor(e, t, s) {
                super(e), this.channel = s, t && this._patch(t)
            }
            _patch(e) {
                this.id = e.id, this.type = u[e.type], this.content = e.content, this.author = this.client.users.add(e.author, !e.webhook_id), this.pinned = e.pinned, this.tts = e.tts, this.nonce = e.nonce, this.system = 6 === e.type, this.embeds = e.embeds.map(e => new r(e)), this.attachments = new l;
                for (const t of e.attachments) this.attachments.set(t.id, new n(t.url, t.filename, t));
                if (this.createdTimestamp = new Date(e.timestamp).getTime(), this.editedTimestamp = e.edited_timestamp ? new Date(e.edited_timestamp).getTime() : null, this.reactions = new h(this), e.reactions && e.reactions.length > 0)
                    for (const t of e.reactions) this.reactions.add(t);
                this.mentions = new i(this, e.mentions, e.mention_roles, e.mention_everyone), this.webhookID = e.webhook_id || null, this.application = e.application ? new a(this.client, e.application) : null, this.activity = e.activity ? {
                    partyID: e.activity.party_id,
                    type: e.activity.type
                } : null, this.hit = "boolean" == typeof e.hit ? e.hit : null, this._edits = []
            }
            patch(e) {
                const t = this._clone();
                if (this._edits.unshift(t), this.editedTimestamp = new Date(e.edited_timestamp).getTime(), "content" in e && (this.content = e.content), "pinned" in e && (this.pinned = e.pinned), "tts" in e && (this.tts = e.tts), this.embeds = "embeds" in e ? e.embeds.map(e => new r(e)) : this.embeds.slice(), "attachments" in e) {
                    this.attachments = new l;
                    for (const t of e.attachments) this.attachments.set(t.id, new n(t.url, t.filename, t))
                } else this.attachments = new l(this.attachments);
                this.mentions = new i(this, "mentions" in e ? e.mentions : this.mentions.users, "mentions_roles" in e ? e.mentions_roles : this.mentions.roles, "mention_everyone" in e ? e.mention_everyone : this.mentions.everyone)
            }
            get member() {
                return this.guild && this.guild.member(this.author) || null
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            get editedAt() {
                return this.editedTimestamp ? new Date(this.editedTimestamp) : null
            }
            get guild() {
                return this.channel.guild || null
            }
            get cleanContent() {
                return this.content.replace(/@(everyone|here)/g, "@​$1").replace(/<@!?[0-9]+>/g, e => {
                    const t = e.replace(/<|!|>|@/g, "");
                    if ("dm" === this.channel.type || "group" === this.channel.type) return this.client.users.has(t) ? `@${this.client.users.get(t).username}` : e;
                    const s = this.channel.guild.members.get(t);
                    if (s) return s.nickname ? `@${s.nickname}` : `@${s.user.username}`; {
                        const s = this.client.users.get(t);
                        return s ? `@${s.username}` : e
                    }
                }).replace(/<#[0-9]+>/g, e => {
                    const t = this.client.channels.get(e.replace(/<|#|>/g, ""));
                    return t ? `#${t.name}` : e
                }).replace(/<@&[0-9]+>/g, e => {
                    if ("dm" === this.channel.type || "group" === this.channel.type) return e;
                    const t = this.guild.roles.get(e.replace(/<|@|>|&/g, ""));
                    return t ? `@${t.name}` : e
                })
            }
            createReactionCollector(e, t = {}) {
                return new o(this, e, t)
            }
            awaitReactions(e, t = {}) {
                return new Promise((s, i) => {
                    this.createReactionCollector(e, t).once("end", (e, n) => {
                        t.errors && t.errors.includes(n) ? i(e) : s(e)
                    })
                })
            }
            get edits() {
                const e = this._edits.slice();
                return e.unshift(this), e
            }
            get editable() {
                return this.author.id === this.client.user.id
            }
            get deletable() {
                return this.author.id === this.client.user.id || this.guild && this.channel.permissionsFor(this.client.user).has(d.FLAGS.MANAGE_MESSAGES)
            }
            get pinnable() {
                return !this.guild || this.channel.permissionsFor(this.client.user).has(d.FLAGS.MANAGE_MESSAGES)
            }
            async edit(e, t) {
                t || "object" != typeof e || e instanceof Array ? t || (t = {}) : (t = e, e = null), t.content || (t.content = e);
                const {
                    data: s
                } = await E(this, t);
                return this.client.api.channels[this.channel.id].messages[this.id].patch({
                    data: s
                }).then(e => {
                    const t = this._clone();
                    return t._patch(e), t
                })
            }
            pin() {
                return this.client.api.channels(this.channel.id).pins(this.id).put().then(() => this)
            }
            unpin() {
                return this.client.api.channels(this.channel.id).pins(this.id).delete().then(() => this)
            }
            react(e) {
                if (!(e = this.client.emojis.resolveIdentifier(e))) throw new f("EMOJI_TYPE");
                return this.client.api.channels(this.channel.id).messages(this.id).reactions(e, "@me").put().then(() => this.client.actions.MessageReactionAdd.handle({
                    user: this.client.user,
                    channel: this.channel,
                    message: this,
                    emoji: c.parseEmoji(e)
                }).reaction)
            }
            delete({
                timeout: e = 0,
                reason: t
            } = {}) {
                return e <= 0 ? this.client.api.channels(this.channel.id).messages(this.id).delete({
                    reason: t
                }).then(() => this.client.actions.MessageDelete.handle({
                    id: this.id,
                    channel_id: this.channel.id
                }).message) : new Promise(s => {
                    this.client.setTimeout(() => {
                        s(this.delete({
                            reason: t
                        }))
                    }, e)
                })
            }
            reply(e, t) {
                return t || "object" != typeof e || e instanceof Array ? t || (t = {}) : (t = e, e = ""), this.channel.send(e, Object.assign(t, {
                    reply: this.member || this.author
                }))
            }
            acknowledge() {
                return this.client.api.channels(this.channel.id).messages(this.id).ack.post({
                    data: {
                        token: this.client.rest._ackToken
                    }
                }).then(e => (e.token && (this.client.rest._ackToken = e.token), this))
            }
            fetchWebhook() {
                return this.webhookID ? this.client.fetchWebhook(this.webhookID) : Promise.reject(new m("WEBHOOK_MESSAGE"))
            }
            equals(e, t) {
                if (!e) return !1;
                if (!e.author && !e.attachments) return this.id === e.id && this.embeds.length === e.embeds.length;
                let s = this.id === e.id && this.author.id === e.author.id && this.content === e.content && this.tts === e.tts && this.nonce === e.nonce && this.embeds.length === e.embeds.length && this.attachments.length === e.attachments.length;
                return s && t && (s = this.mentions.everyone === e.mentions.everyone && this.createdTimestamp === new Date(t.timestamp).getTime() && this.editedTimestamp === new Date(t.edited_timestamp).getTime()), s
            }
            toString() {
                return this.content
            }
            toJSON() {
                return super.toJSON({
                    channel: "channelID",
                    author: "authorID",
                    application: "applicationID",
                    guild: "guildID",
                    cleanContent: !0,
                    member: !1,
                    reactions: !1
                })
            }
        }
    }, function(e, t, s) {
        const i = s(4),
            n = s(2),
            r = s(25);
        e.exports = class extends r {
            constructor(e, t, s = {}) {
                super(), Object.defineProperty(this, "client", {
                    value: e
                }), this.filter = t, this.options = s, this.collected = new i, this.ended = !1, this._timeout = null, this.handleCollect = this.handleCollect.bind(this), this.handleDispose = this.handleDispose.bind(this), s.time && (this._timeout = this.client.setTimeout(() => this.stop("time"), s.time))
            }
            handleCollect(...e) {
                const t = this.collect(...e);
                t && this.filter(...e, this.collected) && (this.collected.set(t, e[0]), this.emit("collect", ...e)), this.checkEnd()
            }
            handleDispose(...e) {
                if (!this.options.dispose) return;
                const t = this.dispose(...e);
                t && this.filter(...e) && this.collected.has(t) && (this.collected.delete(t), this.emit("dispose", ...e), this.checkEnd())
            }
            get next() {
                return new Promise((e, t) => {
                    if (this.ended) return void t(this.collected);
                    const s = () => {
                            this.removeListener("collect", i), this.removeListener("end", n)
                        },
                        i = t => {
                            s(), e(t)
                        },
                        n = () => {
                            s(), t(this.collected)
                        };
                    this.on("collect", i), this.on("end", n)
                })
            }
            stop(e = "user") {
                this.ended || (this._timeout && this.client.clearTimeout(this._timeout), this.ended = !0, this.emit("end", this.collected, e))
            }
            checkEnd() {
                const e = this.endReason();
                e && this.stop(e)
            }
            toJSON() {
                return n.flatten(this)
            }
            collect() {}
            dispose() {}
            endReason() {}
        }
    }, function(e, t, s) {
        const i = s(6);
        e.exports = class extends i {
            constructor(e, t) {
                super(e), this.animated = t.animated, this.name = t.name, this.id = t.id
            }
            get identifier() {
                return this.id ? `${this.animated?"a:":""}${this.name}:${this.id}` : encodeURIComponent(this.name)
            }
            get url() {
                return this.id ? this.client.rest.cdn.Emoji(this.id, this.animated ? "gif" : "png") : null
            }
            toString() {
                return this.id ? `<${this.animated?"a":""}:${this.name}:${this.id}>` : this.name
            }
            toJSON() {
                return super.toJSON({
                    guild: "guildID",
                    createdTimestamp: !0,
                    url: !0,
                    identifier: !0
                })
            }
        }
    }, function(e, t, s) {
        const i = {
            GuildEmoji: s(19),
            DMChannel: s(72),
            GroupDMChannel: s(63),
            TextChannel: s(62),
            VoiceChannel: s(60),
            CategoryChannel: s(59),
            GuildChannel: s(11),
            GuildMember: s(14),
            Guild: s(24),
            Message: s(32),
            MessageReaction: s(31),
            Presence: s(17).Presence,
            Role: s(13),
            User: s(12)
        };
        e.exports = class {
            constructor() {
                throw new Error(`The ${this.constructor.name} class may not be instantiated.`)
            }
            static get(e) {
                if ("string" == typeof e) return i[e];
                throw new TypeError(`"structure" argument must be a string (received ${typeof e})`)
            }
            static extend(e, t) {
                if (!i[e]) throw new RangeError(`"${e}" is not a valid extensible structure.`);
                if ("function" != typeof t) {
                    const e = `(received ${typeof t})`;
                    throw new TypeError(`"extender" argument must be a function that returns the extended structure class/prototype ${e}`)
                }
                const s = t(i[e]);
                if ("function" != typeof s) throw new TypeError("The extender function must return the extended structure class/prototype.");
                if (Object.getPrototypeOf(s) !== i[e]) throw new Error("The class/prototype returned from the extender function must extend the existing structure class/prototype.");
                return i[e] = s, s
            }
        }
    }, function(e, t, s) {
        const {
            Endpoints: i
        } = s(3), n = s(6);
        e.exports = class extends n {
            constructor(e, t) {
                super(e), this._patch(t)
            }
            _patch(e) {
                this.guild = this.client.guilds.add(e.guild, !1), this.code = e.code, this.presenceCount = e.approximate_presence_count, this.memberCount = e.approximate_member_count, this.textChannelCount = e.guild.text_channel_count, this.voiceChannelCount = e.guild.voice_channel_count, this.temporary = e.temporary, this.maxAge = e.max_age, this.uses = e.uses, this.maxUses = e.max_uses, e.inviter && (this.inviter = this.client.users.add(e.inviter)), this.channel = this.client.channels.add(e.channel, this.guild, !1), this.createdTimestamp = new Date(e.created_at).getTime()
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            get expiresTimestamp() {
                return this.createdTimestamp + 1e3 * this.maxAge
            }
            get expiresAt() {
                return new Date(this.expiresTimestamp)
            }
            get url() {
                return i.invite(this.client.options.http.invite, this.code)
            }
            delete(e) {
                return this.client.api.invites[this.code].delete({
                    reason: e
                }).then(() => this)
            }
            toString() {
                return this.url
            }
            toJSON() {
                return super.toJSON({
                    url: !0,
                    expiresTimestamp: !0,
                    presenceCount: !1,
                    memberCount: !1,
                    textChannelCount: !1,
                    voiceChannelCount: !1,
                    uses: !1,
                    channel: "channelID",
                    inviter: "inviterID",
                    guild: "guildID"
                })
            }
        }
    }, function(e, t) {}, function(e, t, s) {
        const i = s(7),
            {
                ClientApplicationAssetTypes: n,
                Endpoints: r
            } = s(3),
            o = s(9),
            a = s(6);
        class c extends a {
            constructor(e, t) {
                super(e), this._patch(t)
            }
            _patch(e) {
                this.id = e.id, this.name = e.name, this.description = e.description, this.icon = e.icon, this.cover = e.cover_image, this.rpcOrigins = e.rpc_origins, this.redirectURIs = e.redirect_uris, this.botRequireCodeGrant = e.bot_require_code_grant, this.botPublic = e.bot_public, this.rpcApplicationState = e.rpc_application_state, this.bot = e.bot, this.flags = e.flags, this.secret = e.secret, e.owner && (this.owner = this.client.users.add(e.owner))
            }
            get createdTimestamp() {
                return i.deconstruct(this.id).timestamp
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            iconURL({
                format: e,
                size: t
            } = {}) {
                return this.icon ? this.client.rest.cdn.AppIcon(this.id, this.icon, {
                    format: e,
                    size: t
                }) : null
            }
            coverImage({
                format: e,
                size: t
            } = {}) {
                return this.cover ? r.CDN(this.client.options.http.cdn).AppIcon(this.id, this.cover, {
                    format: e,
                    size: t
                }) : null
            }
            fetchAssets() {
                const e = Object.keys(n);
                return this.client.api.oauth2.applications(this.id).assets.get().then(t => t.map(t => ({
                    id: t.id,
                    name: t.name,
                    type: e[t.type - 1]
                })))
            }
            async createAsset(e, t, s) {
                return this.client.api.oauth2.applications(this.id).assets.post({
                    data: {
                        name: e,
                        type: n[s.toUpperCase()],
                        image: await o.resolveImage(t)
                    }
                })
            }
            resetSecret() {
                return this.client.api.oauth2.applications[this.id].reset.post().then(e => new c(this.client, e))
            }
            resetToken() {
                return this.client.api.oauth2.applications[this.id].bot.reset.post().then(e => new c(this.client, Object.assign({}, this, {
                    bot: e
                })))
            }
            toString() {
                return this.name
            }
            toJSON() {
                return super.toJSON({
                    createdTimestamp: !0
                })
            }
        }
        e.exports = c
    }, function(e, t) {
        var s;
        s = function() {
            return this
        }();
        try {
            s = s || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" == typeof window && (s = window)
        }
        e.exports = s
    }, function(e, t, s) {
        "use strict";
        let i;
        try {
            const {
                app: e
            } = s(94);
            i = e.setAsDefaultProtocolClient.bind(e)
        } catch (e) {
            try {
                i = s(93)
            } catch (e) {}
        }
        "function" != typeof i && (i = (() => !1)), e.exports = {
            pid: function() {
                return void 0 !== typeof process ? process.pid : null
            },
            register: i
        }
    }, function(e, t) {
        const s = Symbol("code"),
            i = new Map;

        function n(e) {
            return class t extends e {
                constructor(e, ...n) {
                    super(function(e, t) {
                        if ("string" != typeof e) throw new Error("Error message key must be a string");
                        const s = i.get(e);
                        if (!s) throw new Error(`An invalid error message key was used: ${e}.`);
                        return "function" == typeof s ? s(...t) : void 0 === t || 0 === t.length ? s : (t.unshift(s), String(...t))
                    }(e, n)), this[s] = e, Error.captureStackTrace && Error.captureStackTrace(this, t)
                }
                get name() {
                    return `${super.name} [${this[s]}]`
                }
                get code() {
                    return this[s]
                }
            }
        }
        e.exports = {
            register: function(e, t) {
                i.set(e, "function" == typeof t ? t : String(t))
            },
            Error: n(Error),
            TypeError: n(TypeError),
            RangeError: n(RangeError)
        }
    }, function(e, t, s) {
        const i = s(5),
            {
                Presence: n
            } = s(17);
        e.exports = class extends i {
            constructor(e, t) {
                super(e, t, n)
            }
            add(e, t) {
                const s = this.get(e.user.id);
                return s ? s.patch(e) : super.add(e, t, {
                    id: e.user.id
                })
            }
            resolve(e) {
                const t = super.resolve(e);
                if (t) return t;
                const s = this.client.users.resolveID(e);
                return super.resolve(s) || null
            }
            resolveID(e) {
                const t = super.resolveID(e);
                if (t) return t;
                const s = this.client.users.resolveID(e);
                return this.has(s) ? s : null
            }
        }
    }, function(e, t, s) {
        const i = s(10),
            {
                ChannelTypes: n
            } = s(3),
            r = s(5),
            o = s(11),
            a = s(29);
        e.exports = class extends r {
            constructor(e, t) {
                super(e.client, t, o), this.guild = e
            }
            add(e) {
                const t = this.get(e.id);
                return t || i.create(this.client, e, this.guild)
            }
            create(e, {
                type: t,
                topic: s,
                nsfw: i,
                bitrate: r,
                userLimit: o,
                parent: c,
                overwrites: l,
                reason: h
            } = {}) {
                return c && (c = this.client.channels.resolveID(c)), this.client.api.guilds(this.guild.id).channels.post({
                    data: {
                        name: e,
                        topic: s,
                        type: t ? n[t.toUpperCase()] : "text",
                        nsfw: i,
                        bitrate: r,
                        user_limit: o,
                        parent_id: c,
                        permission_overwrites: a.call(this, l)
                    },
                    reason: h
                }).then(e => this.client.actions.ChannelCreate.handle(e).channel)
            }
        }
    }, function(e, t, s) {
        const i = s(4),
            n = s(5),
            r = s(19),
            o = s(30),
            a = s(9),
            {
                TypeError: c
            } = s(1);
        e.exports = class extends n {
            constructor(e, t) {
                super(e.client, t, r), this.guild = e
            }
            add(e, t) {
                return super.add(e, t, {
                    extras: [this.guild]
                })
            }
            create(e, t, {
                roles: s,
                reason: n
            } = {}) {
                if ("string" == typeof e && e.startsWith("data:")) {
                    const r = {
                        image: e,
                        name: t
                    };
                    if (s) {
                        r.roles = [];
                        for (let e of s instanceof i ? s.values() : s) {
                            if (!(e = this.guild.roles.resolve(e))) return Promise.reject(new c("INVALID_TYPE", "options.roles", "Array or Collection of Roles or Snowflakes", !0));
                            r.roles.push(e.id)
                        }
                    }
                    return this.client.api.guilds(this.guild.id).emojis.post({
                        data: r,
                        reason: n
                    }).then(e => this.client.actions.GuildEmojiCreate.handle(this.guild, e).emoji)
                }
                return a.resolveImage(e).then(e => this.create(e, t, {
                    roles: s,
                    reason: n
                }))
            }
            resolve(e) {
                return e instanceof o ? super.resolve(e.id) : super.resolve(e)
            }
            resolveID(e) {
                return e instanceof o ? e.id : super.resolveID(e)
            }
            resolveIdentifier(e) {
                const t = this.resolve(e);
                return t ? t.identifier : e instanceof o ? e.identifier : "string" == typeof e ? e.includes("%") ? e : encodeURIComponent(e) : null
            }
        }
    }, function(e, t, s) {
        const i = s(5),
            n = s(13),
            {
                resolveColor: r
            } = s(2),
            o = s(8);
        e.exports = class extends i {
            constructor(e, t) {
                super(e.client, t, n), this.guild = e
            }
            add(e, t) {
                return super.add(e, t, {
                    extras: [this.guild]
                })
            }
            create({
                data: e = {},
                reason: t
            } = {}) {
                return e.color && (e.color = r(e.color)), e.permissions && (e.permissions = o.resolve(e.permissions)), this.guild.client.api.guilds(this.guild.id).roles.post({
                    data: e,
                    reason: t
                }).then(s => {
                    const {
                        role: i
                    } = this.client.actions.GuildRoleCreate.handle({
                        guild_id: this.guild.id,
                        role: s
                    });
                    return e.position ? i.setPosition(e.position, t) : i
                })
            }
            get highest() {
                return this.reduce((e, t) => t.comparePositionTo(e) > 0 ? t : e, this.first())
            }
        }
    }, function(e, t, s) {
        const i = s(5),
            n = s(14),
            {
                Events: r,
                OPCodes: o
            } = s(3),
            a = s(4),
            {
                Error: c,
                TypeError: l
            } = s(1);
        e.exports = class extends i {
            constructor(e, t) {
                super(e.client, t, n), this.guild = e
            }
            add(e, t) {
                return super.add(e, t, {
                    extras: [this.guild]
                })
            }
            resolve(e) {
                const t = super.resolve(e);
                if (t) return t;
                const s = this.client.users.resolveID(e);
                return s ? super.resolve(s) : null
            }
            resolveID(e) {
                const t = super.resolveID(e);
                if (t) return t;
                const s = this.client.users.resolveID(e);
                return this.has(s) ? s : null
            }
            fetch(e) {
                if (!e) return this._fetchMany();
                const t = this.client.users.resolveID(e);
                return t ? this._fetchSingle({
                    user: t,
                    cache: !0
                }) : e.user && (e.user = this.client.users.resolveID(e.user), e.user) ? this._fetchSingle(e) : this._fetchMany(e)
            }
            prune({
                days: e = 7,
                dry: t = !1,
                reason: s
            } = {}) {
                if ("number" != typeof e) throw new l("PRUNE_DAYS_TYPE");
                return this.client.api.guilds(this.guild.id).prune[t ? "get" : "post"]({
                    query: {
                        days: e
                    },
                    reason: s
                }).then(e => e.pruned)
            }
            ban(e, t = {
                days: 0
            }) {
                t.days && (t["delete-message-days"] = t.days);
                const s = this.client.users.resolveID(e);
                return s ? this.client.api.guilds(this.guild.id).bans[s].put({
                    query: t
                }).then(() => {
                    if (e instanceof n) return e;
                    const t = this.client.users.resolve(s);
                    return t ? this.resolve(t) || t : s
                }) : Promise.reject(new c("BAN_RESOLVE_ID", !0))
            }
            unban(e, t) {
                const s = this.client.users.resolveID(e);
                if (!s) throw new c("BAN_RESOLVE_ID");
                return this.client.api.guilds(this.guild.id).bans[s].delete({
                    reason: t
                }).then(() => this.client.users.resolve(e))
            }
            _fetchSingle({
                user: e,
                cache: t
            }) {
                const s = this.get(e);
                return s ? Promise.resolve(s) : this.client.api.guilds(this.guild.id).members(e).get().then(e => this.add(e, t))
            }
            _fetchMany({
                query: e = "",
                limit: t = 0
            } = {}) {
                return new Promise((s, i) => {
                    if (this.guild.memberCount === this.size) return void s(e || t ? new a : this);
                    this.guild.client.ws.send({
                        op: o.REQUEST_GUILD_MEMBERS,
                        d: {
                            guild_id: this.guild.id,
                            query: e,
                            limit: t
                        }
                    });
                    const n = new a,
                        l = (i, o) => {
                            if (o.id === this.guild.id) {
                                for (const s of i.values())(e || t) && n.set(s.id, s);
                                (this.guild.memberCount <= this.size || (e || t) && i.size < 1e3 || t && n.size >= t) && (this.guild.client.removeListener(r.GUILD_MEMBERS_CHUNK, l), s(e || t ? n : this))
                            }
                        };
                    this.guild.client.on(r.GUILD_MEMBERS_CHUNK, l), this.guild.client.setTimeout(() => {
                        this.guild.client.removeListener(r.GUILD_MEMBERS_CHUNK, l), i(new c("GUILD_MEMBERS_TIMEOUT"))
                    }, 12e4)
                })
            }
        }
    }, function(e, t, s) {
        const i = s(2);
        e.exports = class {
            constructor(e) {
                this.id = e.id, this.name = e.name, this.vip = e.vip, this.deprecated = e.deprecated, this.optimal = e.optimal, this.custom = e.custom, this.sampleHostname = e.sample_hostname
            }
            toJSON() {
                return i.flatten(this)
            }
        }
    }, function(e, t) {
        const s = () => {},
            i = ["get", "post", "delete", "patch", "put"],
            n = ["toString", "valueOf", "inspect", "constructor", Symbol.toPrimitive, Symbol.for("util.inspect.custom")];
        e.exports = function(e) {
            const t = [""],
                r = {
                    get: (o, a) => n.includes(a) ? () => t.join("/") : i.includes(a) ? s => e.request(a, t.join("/"), Object.assign({
                        versioned: e.versioned,
                        route: t.map((e, s) => /\d{16,19}/g.test(e) ? /channels|guilds/.test(t[s - 1]) ? e : ":id" : e).join("/")
                    }, s)) : (t.push(a), new Proxy(s, r)),
                    apply: (e, i, n) => (t.push(...n.filter(e => null != e)), new Proxy(s, r))
                };
            return new Proxy(s, r)
        }
    }, function(e, t) {}, function(e, t, s) {
        const i = s(26),
            n = s(21),
            r = s(49),
            {
                browser: o,
                UserAgent: a
            } = s(3);
        if (r.Agent) var c = new r.Agent({
            keepAlive: !0
        });
        e.exports = class {
            constructor(e, t, s, n) {
                this.rest = e, this.client = e.client, this.method = t, this.route = n.route, this.options = n;
                const r = (i.stringify(n.query).match(/[^=&?]+=[^=&?]+/g) || []).join("&");
                this.path = `${s}${r?`?${r}`:""}`
            }
            gen() {
                const e = !1 === this.options.versioned ? this.client.options.http.api : `${this.client.options.http.api}/v${this.client.options.http.version}`,
                    t = n[this.method](`${e}${this.path}`, {
                        agent: c
                    });
                if (!1 !== this.options.auth && t.set("Authorization", this.rest.getAuth()), this.options.reason && t.set("X-Audit-Log-Reason", encodeURIComponent(this.options.reason)), o || t.set("User-Agent", a), this.options.headers && t.set(this.options.headers), this.options.files) {
                    for (const e of this.options.files) e && e.file && t.attach(e.name, e.file, e.name);
                    void 0 !== this.options.data && t.attach("payload_json", JSON.stringify(this.options.data))
                } else void 0 !== this.options.data && t.send(this.options.data);
                return t
            }
        }
    }, function(e, t) {
        e.exports = class extends Error {
            constructor(e, t) {
                super();
                const s = this.constructor.flattenErrors(t.errors || t).join("\n");
                this.name = "DiscordAPIError", this.message = t.message && s ? `${t.message}\n${s}` : t.message || s, this.path = e, this.code = t.code
            }
            static flattenErrors(e, t = "") {
                let s = [];
                for (const [i, n] of Object.entries(e)) {
                    if ("message" === i) continue;
                    const e = t ? isNaN(i) ? `${t}.${i}` : `${t}[${i}]` : i;
                    n._errors ? s.push(`${e}: ${n._errors.map(e=>e.message).join(" ")}`) : n.code || n.message ? s.push(`${n.code?`${n.code}: `:""}${n.message}`.trim()) : "string" == typeof n ? s.push(n) : s = s.concat(this.flattenErrors(n, e))
                }
                return s
            }
        }
    }, function(e, t, s) {
        const i = s(51),
            {
                Events: {
                    RATE_LIMIT: n
                }
            } = s(3);
        e.exports = class {
            constructor(e, t) {
                this.manager = e, this.client = this.manager.client, this.handle = t.bind(this), this.limit = 1 / 0, this.resetTime = null, this.remaining = 1, this.queue = []
            }
            get limited() {
                return this.manager.globallyRateLimited || this.remaining <= 0
            }
            set globallyLimited(e) {
                this.manager.globallyRateLimited = e
            }
            push(e) {
                this.queue.push(e), this.handle()
            }
            execute(e) {
                return new Promise((t, s) => {
                    const r = i => {
                        i || this.limited ? (i || (i = this.resetTime - Date.now() + this.manager.timeDifference + this.client.options.restTimeOffset), s({
                            timeout: i
                        }), this.client.listenerCount(n) && this.client.emit(n, {
                            timeout: i,
                            limit: this.limit,
                            timeDifference: this.manager.timeDifference,
                            method: e.request.method,
                            path: e.request.path,
                            route: e.request.route
                        })) : t()
                    };
                    e.request.gen().end((t, s) => {
                        if (s && s.headers && (s.headers["x-ratelimit-global"] && (this.globallyLimited = !0), this.limit = Number(s.headers["x-ratelimit-limit"]), this.resetTime = 1e3 * Number(s.headers["x-ratelimit-reset"]), this.remaining = Number(s.headers["x-ratelimit-remaining"]), this.manager.timeDifference = Date.now() - new Date(s.headers.date).getTime()), t) 429 === t.status ? (this.queue.unshift(e), r(Number(s.headers["retry-after"]) + this.client.options.restTimeOffset)) : t.status >= 500 && t.status < 600 ? (this.queue.unshift(e), r(1e3 + this.client.options.restTimeOffset)) : (e.reject(t.status >= 400 && t.status < 500 ? new i(s.request.path, s.body) : t), r());
                        else {
                            const t = s && s.body ? s.body : {};
                            e.resolve(t), r()
                        }
                    })
                })
            }
            reset() {
                this.globallyLimited = !1, this.remaining = 1
            }
        }
    }, function(e, t) {
        e.exports = function() {
            this.limited || 0 === this.queue.length || (this.execute(this.queue.shift()).then(this.handle.bind(this)).catch(({
                timeout: e
            }) => {
                this.client.setTimeout(() => {
                    this.reset(), this.handle()
                }, e)
            }), this.remaining--, this.handle())
        }
    }, function(e, t) {
        e.exports = function() {
            this.busy || this.limited || 0 === this.queue.length || (this.busy = !0, this.execute(this.queue.shift()).then(() => {
                this.busy = !1, this.handle()
            }).catch(({
                timeout: e
            }) => {
                this.client.setTimeout(() => {
                    this.reset(), this.busy = !1, this.handle()
                }, e)
            }))
        }
    }, function(e, t, s) {
        e.exports = {
            sequential: s(54),
            burst: s(53),
            RequestHandler: s(52)
        }
    }, function(e, t, s) {
        const i = s(55),
            n = s(50),
            r = s(48),
            {
                Error: o
            } = s(1),
            {
                Endpoints: a
            } = s(3);
        e.exports = class {
            constructor(e, t = "Bot") {
                this.client = e, this.handlers = {}, this.rateLimitedEndpoints = {}, this.globallyRateLimited = !1, this.tokenPrefix = t, this.versioned = !0, this.timeDifferences = []
            }
            get api() {
                return r(this)
            }
            get timeDifference() {
                return Math.round(this.timeDifferences.reduce((e, t) => e + t, 0) / this.timeDifferences.length)
            }
            set timeDifference(e) {
                this.timeDifferences.unshift(e), this.timeDifferences.length > 5 && (this.timeDifferences.length = 5)
            }
            getAuth() {
                const e = this.client.token || this.client.accessToken,
                    t = !!this.client.application || this.client.user && this.client.user.bot;
                if (e && t) return `${this.tokenPrefix} ${e}`;
                if (e) return e;
                throw new o("TOKEN_MISSING")
            }
            get cdn() {
                return a.CDN(this.client.options.http.cdn)
            }
            push(e, t) {
                return new Promise((s, i) => {
                    e.push({
                        request: t,
                        resolve: s,
                        reject: i
                    })
                })
            }
            getRequestHandler() {
                const e = this.client.options.apiRequestMethod;
                if ("function" == typeof e) return e;
                const t = i[e];
                if (!t) throw new o("RATELIMIT_INVALID_METHOD");
                return t
            }
            request(e, t, s = {}) {
                const r = new n(this, e, t, s);
                return this.handlers[r.route] || (this.handlers[r.route] = new i.RequestHandler(this, this.getRequestHandler())), this.push(this.handlers[r.route], r)
            }
            set endpoint(e) {
                this.client.options.http.api = e
            }
        }
    }, function(e, t, s) {
        const i = s(16),
            n = s(27);
        class r extends n {
            constructor(e, t, s) {
                super(s), Object.defineProperty(this, "client", {
                    value: this
                }), this.id = e, this.token = t
            }
        }
        i.applyToClass(r), e.exports = r
    }, function(e, t, s) {
        const i = s(28);
        e.exports = async function(e, t) {
            const n = s(12),
                r = s(14);
            if (e instanceof n || e instanceof r) return e.createDM().then(e => e.send(t));
            const {
                data: o,
                files: a
            } = await i(e, t);
            if (o.content instanceof Array) {
                const t = [];
                for (let s = 0; s < o.content.length; s++) {
                    const i = s === o.content.length - 1 ? {
                            tts: o.tts,
                            embed: o.embed,
                            files: a
                        } : {
                            tts: o.tts
                        },
                        n = await e.send(o.content[s], i);
                    t.push(n)
                }
                return t
            }
            return e.client.api.channels[e.id].messages.post({
                data: o,
                files: a
            }).then(t => e.client.actions.MessageCreate.handle(t).message)
        }
    }, function(e, t, s) {
        const i = s(11);
        e.exports = class extends i {
            get children() {
                return this.guild.channels.filter(e => e.parentID === this.id)
            }
        }
    }, function(e, t, s) {
        const i = s(11),
            n = s(4),
            {
                browser: r
            } = s(3),
            {
                Error: o
            } = s(1);
        e.exports = class extends i {
            constructor(e, t) {
                super(e, t), Object.defineProperty(this, "members", {
                    value: new n
                })
            }
            _patch(e) {
                super._patch(e), this.bitrate = e.bitrate, this.userLimit = e.user_limit
            }
            get connection() {
                const e = this.guild.voiceConnection;
                return e && e.channel.id === this.id ? e : null
            }
            get full() {
                return this.userLimit > 0 && this.members.size >= this.userLimit
            }
            get joinable() {
                return !(r || !this.permissionsFor(this.client.user).has("CONNECT") || this.full && !this.permissionsFor(this.client.user).has("MOVE_MEMBERS"))
            }
            get speakable() {
                return this.permissionsFor(this.client.user).has("SPEAK")
            }
            setBitrate(e, t) {
                return this.edit({
                    bitrate: e
                }, t)
            }
            setUserLimit(e, t) {
                return this.edit({
                    userLimit: e
                }, t)
            }
            join() {
                return r ? Promise.reject(new o("VOICE_NO_BROWSER")) : this.client.voice.joinChannel(this)
            }
            leave() {
                if (r) return;
                const e = this.client.voice.connections.get(this.guild.id);
                e && e.channel.id === this.id && e.disconnect()
            }
        }
    }, function(e, t, s) {
        const i = s(8),
            n = s(2);
        e.exports = class {
            constructor(e, t) {
                Object.defineProperty(this, "channel", {
                    value: e
                }), t && this._patch(t)
            }
            _patch(e) {
                this.id = e.id, this.type = e.type, this.denied = new i(e.deny).freeze(), this.allowed = new i(e.allow).freeze()
            }
            delete(e) {
                return this.channel.client.api.channels[this.channel.id].permissions[this.id].delete({
                    reason: e
                }).then(() => this)
            }
            toJSON() {
                return n.flatten(this)
            }
        }
    }, function(e, t, s) {
        const i = s(11),
            n = s(16),
            r = s(15),
            o = s(4),
            a = s(9),
            c = s(18);
        class l extends i {
            constructor(e, t) {
                super(e, t), this.messages = new c(this), this._typing = new Map
            }
            _patch(e) {
                if (super._patch(e), this.topic = e.topic, this.nsfw = Boolean(e.nsfw), this.lastMessageID = e.last_message_id, e.messages)
                    for (const t of e.messages) this.messages.add(t)
            }
            setNSFW(e, t) {
                return this.edit({
                    nsfw: e
                }, t)
            }
            fetchWebhooks() {
                return this.client.api.channels[this.id].webhooks.get().then(e => {
                    const t = new o;
                    for (const s of e) t.set(s.id, new n(this.client, s));
                    return t
                })
            }
            async createWebhook(e, {
                avatar: t,
                reason: s
            } = {}) {
                return "string" != typeof t || t.startsWith("data:") || (t = await a.resolveImage(t)), this.client.api.channels[this.id].webhooks.post({
                    data: {
                        name: e,
                        avatar: t
                    },
                    reason: s
                }).then(e => new n(this.client, e))
            }
            get lastMessage() {}
            send() {}
            search() {}
            startTyping() {}
            stopTyping() {}
            get typing() {}
            get typingCount() {}
            createMessageCollector() {}
            awaitMessages() {}
            bulkDelete() {}
            acknowledge() {}
            _cacheMessage() {}
        }
        r.applyToClass(l, !0), e.exports = l
    }, function(e, t, s) {
        const i = s(10),
            n = s(15),
            r = s(4),
            o = s(9),
            a = s(18);
        class c extends i {
            constructor(e, t) {
                super(e, t), this.messages = new a(this), this._typing = new Map
            }
            _patch(e) {
                if (super._patch(e), this.name = e.name, this.icon = e.icon, this.ownerID = e.owner_id, this.managed = e.managed, this.applicationID = e.application_id, e.nicks && (this.nicks = new r(e.nicks.map(e => [e.id, e.nick]))), this.recipients || (this.recipients = new r), e.recipients)
                    for (const t of e.recipients) {
                        const e = this.client.users.add(t);
                        this.recipients.set(e.id, e)
                    }
                this.lastMessageID = e.last_message_id
            }
            get owner() {
                return this.client.users.get(this.ownerID) || null
            }
            iconURL({
                format: e,
                size: t
            } = {}) {
                return this.icon ? this.client.rest.cdn.GDMIcon(this.id, this.icon, e, t) : null
            }
            equals(e) {
                const t = e && this.id === e.id && this.name === e.name && this.icon === e.icon && this.ownerID === e.ownerID;
                return t ? this.recipients.equals(e.recipients) : t
            }
            edit(e, t) {
                return this.client.api.channels[this.id].patch({
                    data: {
                        icon: e.icon,
                        name: null === e.name ? null : e.name || this.name
                    },
                    reason: t
                }).then(() => this)
            }
            async setIcon(e) {
                return this.edit({
                    icon: await o.resolveImage(e)
                })
            }
            setName(e) {
                return this.edit({
                    name: e
                })
            }
            addUser({
                user: e,
                accessToken: t,
                nick: s
            }) {
                const i = this.client.users.resolveID(e),
                    n = this.client.user.bot ? {
                        nick: s,
                        access_token: t
                    } : {
                        recipient: i
                    };
                return this.client.api.channels[this.id].recipients[i].put({
                    data: n
                }).then(() => this)
            }
            removeUser(e) {
                const t = this.client.users.resolveID(e);
                return this.client.api.channels[this.id].recipients[t].delete().then(() => this)
            }
            toString() {
                return this.name
            }
            get lastMessage() {}
            send() {}
            search() {}
            startTyping() {}
            stopTyping() {}
            get typing() {}
            get typingCount() {}
            createMessageCollector() {}
            awaitMessages() {}
            acknowledge() {}
            _cacheMessage() {}
        }
        n.applyToClass(c, !0, ["bulkDelete"]), e.exports = c
    }, function(e, t, s) {
        const i = s(2);
        e.exports = class {
            constructor(e, t) {
                this.user = e, this._patch(t)
            }
            _patch(e) {
                this.type = e.type, this.name = e.name, this.id = e.id, this.revoked = e.revoked, this.integrations = e.integrations
            }
            toJSON() {
                return i.flatten(this)
            }
        }
    }, function(e, t, s) {
        const i = s(4),
            {
                UserFlags: n
            } = s(3),
            r = s(64),
            o = s(6);
        e.exports = class extends o {
            constructor(e, t) {
                super(e.client), this.user = e, this.mutualGuilds = new i, this.connections = new i, this._patch(t)
            }
            _patch(e) {
                this.premium = Boolean(e.premium_since), this._flags = e.user.flags, this.premiumSince = e.premium_since ? new Date(e.premium_since) : null;
                for (const t of e.mutual_guilds) this.client.guilds.has(t.id) && this.mutualGuilds.set(t.id, this.client.guilds.get(t.id));
                for (const t of e.connected_accounts) this.connections.set(t.id, new r(this.user, t))
            }
            get flags() {
                const e = [];
                for (const [t, s] of Object.entries(n))(this._flags & s) === s && e.push(t);
                return e
            }
            toJSON() {
                return super.toJSON({
                    flags: !0
                })
            }
        }
    }, function(e, t, s) {
        const i = s(5),
            {
                Error: n
            } = s(1);
        e.exports = class extends i {
            constructor(e, t, i) {
                super(e, t, s(12)), this.reaction = i
            }
            async fetch({
                limit: e = 100,
                after: t,
                before: s
            } = {}) {
                const i = this.reaction.message,
                    n = await this.client.api.channels[i.channel.id].messages[i.id].reactions[this.reaction.emoji.identifier].get({
                        query: {
                            limit: e,
                            before: s,
                            after: t
                        }
                    });
                for (const e of n) {
                    const t = this.client.users.add(e);
                    this.set(t.id, t)
                }
                return this
            }
            remove(e = this.reaction.message.client.user) {
                const t = this.reaction.message,
                    s = t.client.users.resolveID(e);
                return s ? t.client.api.channels[t.channel.id].messages[t.id].reactions[this.reaction.emoji.identifier][s === t.client.user.id ? "@me" : s].delete().then(() => t.client.actions.MessageReactionRemove.handle({
                    user_id: s,
                    message_id: t.id,
                    emoji: this.reaction.emoji,
                    channel_id: t.channel.id
                }).reaction) : Promise.reject(new n("REACTION_RESOLVE_USER"))
            }
        }
    }, function(e, t, s) {
        const i = s(5),
            n = s(31);
        e.exports = class extends i {
            constructor(e, t) {
                super(e.client, t, n), this.message = e
            }
            add(e, t) {
                return super.add(e, t, {
                    id: e.emoji.id || e.emoji.name,
                    extras: [this.message]
                })
            }
            removeAll() {
                return this.client.api.channels(this.message.channel.id).messages(this.message.id).reactions.delete().then(() => this.message)
            }
        }
    }, function(e, t, s) {
        const i = s(33),
            n = s(4),
            {
                Events: r
            } = s(3);
        class o extends i {
            constructor(e, t, s = {}) {
                super(e.client, t, s), this.message = e, this.users = new n, this.total = 0, this.empty = this.empty.bind(this), this.client.on(r.MESSAGE_REACTION_ADD, this.handleCollect), this.client.on(r.MESSAGE_REACTION_REMOVE, this.handleDispose), this.client.on(r.MESSAGE_REACTION_REMOVE_ALL, this.empty), this.once("end", () => {
                    this.client.removeListener(r.MESSAGE_REACTION_ADD, this.handleCollect), this.client.removeListener(r.MESSAGE_REACTION_REMOVE, this.handleDispose), this.client.removeListener(r.MESSAGE_REACTION_REMOVE_ALL, this.empty)
                }), this.on("collect", (e, t) => {
                    this.total++, this.users.set(t.id, t)
                }), this.on("remove", (e, t) => {
                    this.total--, this.collected.some(e => e.users.has(t.id)) || this.users.delete(t.id)
                })
            }
            collect(e) {
                return e.message.id !== this.message.id ? null : o.key(e)
            }
            dispose(e, t) {
                return e.message.id !== this.message.id ? null : (this.collected.has(o.key(e)) && this.emit("remove", e, t), e.count ? null : o.key(e))
            }
            empty() {
                this.total = 0, this.collected.clear(), this.users.clear(), this.checkEnd()
            }
            endReason() {
                return this.options.max && this.total >= this.options.max ? "limit" : this.options.maxEmojis && this.collected.size >= this.options.maxEmojis ? "emojiLimit" : this.options.maxUsers && this.users.size >= this.options.maxUsers ? "userLimit" : null
            }
            static key(e) {
                return e.emoji.id || e.emoji.name
            }
        }
        e.exports = o
    }, function(e, t, s) {
        const i = s(5),
            n = s(13),
            r = s(4),
            {
                TypeError: o
            } = s(1);
        e.exports = class extends i {
            constructor(e) {
                super(e.client, null, n), this.member = e, this.guild = e.guild
            }
            add(e, t) {
                if (e instanceof r) return this.add(e.keyArray(), t);
                if (!(e instanceof Array)) return this.add([e], t);
                if ((e = e.map(e => this.guild.roles.resolve(e))).includes(null)) return Promise.reject(new o("INVALID_TYPE", "roles", "Array or Collection of Roles or Snowflakes", !0));
                const s = [...new Set(e.concat(this.array()))];
                return this.set(s, t)
            }
            set(e, t) {
                return this.member.edit({
                    roles: e
                }, t)
            }
            remove(e, t) {
                if (e instanceof r) return this.remove(e.keyArray(), t);
                if (!(e instanceof Array)) return this.remove([e], t);
                if ((e = e.map(e => this.guild.roles.resolveID(e))).includes(null)) return Promise.reject(new o("INVALID_TYPE", "roles", "Array or Collection of Roles or Snowflakes", !0));
                const s = this.keyArray().filter(t => !e.includes(t));
                return this.set(s, t)
            }
            get hoist() {
                const e = this.filter(e => e.hoist);
                return e.size ? e.reduce((e, t) => !e || t.comparePositionTo(e) > 0 ? t : e) : null
            }
            get color() {
                const e = this.filter(e => e.color);
                return e.size ? e.reduce((e, t) => !e || t.comparePositionTo(e) > 0 ? t : e) : null
            }
            get highest() {
                return this.reduce((e, t) => t.comparePositionTo(e) > 0 ? t : e, this.first())
            }
            _patch(e) {
                this.clear();
                const t = this.guild.roles.get(this.guild.id);
                if (t && super.set(t.id, t), e)
                    for (const t of e) {
                        const e = this.guild.roles.resolve(t);
                        e && super.set(e.id, e)
                    }
            }
            clone() {
                const e = new this.constructor(this.member);
                return e._patch(this.keyArray()), e
            }
        }
    }, function(e, t, s) {
        const i = s(4),
            n = s(2),
            r = s(14);
        class o {
            constructor(e, t, s, n) {
                if (this.everyone = Boolean(n), t)
                    if (t instanceof i) this.users = new i(t);
                    else {
                        this.users = new i;
                        for (const s of t) {
                            let t = e.client.users.add(s);
                            this.users.set(t.id, t)
                        }
                    }
                else this.users = new i;
                if (s)
                    if (s instanceof i) this.roles = new i(s);
                    else {
                        this.roles = new i;
                        for (const t of s) {
                            const s = e.channel.guild.roles.get(t);
                            s && this.roles.set(s.id, s)
                        }
                    }
                else this.roles = new i;
                this._content = e.content, this._client = e.client, this._guild = e.channel.guild, this._members = null, this._channels = null
            }
            get members() {
                return this._members ? this._members : this._guild ? (this._members = new i, this.users.forEach(e => {
                    const t = this._guild.member(e);
                    t && this._members.set(t.user.id, t)
                }), this._members) : null
            }
            get channels() {
                if (this._channels) return this._channels;
                let e;
                for (this._channels = new i; null !== (e = this.constructor.CHANNELS_PATTERN.exec(this._content));) {
                    const t = this._client.channels.get(e[1]);
                    t && this._channels.set(t.id, t)
                }
                return this._channels
            }
            has(e, {
                ignoreDirect: t = !1,
                ignoreRoles: s = !1,
                ignoreEveryone: i = !1
            } = {}) {
                if (!i && this.everyone) return !0;
                if (!s && e instanceof r)
                    for (const t of this.roles.values())
                        if (e.roles.has(t.id)) return !0;
                if (!t) {
                    const t = e.id || e;
                    return this.users.has(t) || this.channels.has(t) || this.roles.has(t)
                }
                return !1
            }
            toJSON() {
                return n.flatten(this, {
                    members: !0,
                    channels: !0
                })
            }
        }
        o.EVERYONE_PATTERN = /@(everyone|here)/g, o.USERS_PATTERN = /<@!?(1|\d{17,19})>/g, o.ROLES_PATTERN = /<@&(\d{17,19})>/g, o.CHANNELS_PATTERN = /<#(\d{17,19})>/g, e.exports = o
    }, function(e, t, s) {
        const i = s(33),
            {
                Events: n
            } = s(3);
        e.exports = class extends i {
            constructor(e, t, s = {}) {
                super(e.client, t, s), this.channel = e, this.received = 0;
                const i = (e => {
                    for (const t of e.values()) this.handleDispose(t)
                }).bind(this);
                this.client.on(n.MESSAGE_CREATE, this.handleCollect), this.client.on(n.MESSAGE_DELETE, this.handleDispose), this.client.on(n.MESSAGE_BULK_DELETE, i), this.once("end", () => {
                    this.client.removeListener(n.MESSAGE_CREATE, this.handleCollect), this.client.removeListener(n.MESSAGE_DELETE, this.handleDispose), this.client.removeListener(n.MESSAGE_BULK_DELETE, i)
                })
            }
            collect(e) {
                return e.channel.id !== this.channel.id ? null : (this.received++, e.id)
            }
            dispose(e) {
                return e.channel.id === this.channel.id ? e.id : null
            }
            endReason() {
                return this.options.max && this.collected.size >= this.options.max ? "limit" : this.options.maxProcessed && this.received === this.options.maxProcessed ? "processedLimit" : null
            }
        }
    }, function(e, t, s) {
        const i = s(10),
            n = s(15),
            r = s(18);
        class o extends i {
            constructor(e, t) {
                super(e, t), this.messages = new r(this), this._typing = new Map
            }
            _patch(e) {
                super._patch(e), this.recipient = this.client.users.add(e.recipients[0]), this.lastMessageID = e.last_message_id
            }
            toString() {
                return this.recipient.toString()
            }
            get lastMessage() {}
            send() {}
            search() {}
            startTyping() {}
            stopTyping() {}
            get typing() {}
            get typingCount() {}
            createMessageCollector() {}
            awaitMessages() {}
            acknowledge() {}
            _cacheMessage() {}
        }
        n.applyToClass(o, !0, ["bulkDelete"]), e.exports = o
    }, function(e, t, s) {
        const i = s(5),
            n = s(4),
            {
                TypeError: r
            } = s(1);
        e.exports = class extends i {
            constructor(e) {
                super(e.client, null, s(19)), this.emoji = e, this.guild = e.guild
            }
            add(e) {
                if (e instanceof n) return this.add(e.keyArray());
                if (!(e instanceof Array)) return this.add([e]);
                if ((e = e.map(e => this.guild.roles.resolve(e))).includes(null)) return Promise.reject(new r("INVALID_TYPE", "roles", "Array or Collection of Roles or Snowflakes", !0));
                const t = [...new Set(e.concat(this.array()))];
                return this.set(t)
            }
            remove(e) {
                if (e instanceof n) return this.remove(e.keyArray());
                if (!(e instanceof Array)) return this.remove([e]);
                if ((e = e.map(e => this.guild.roles.resolveID(e))).includes(null)) return Promise.reject(new r("INVALID_TYPE", "roles", "Array or Collection of Roles or Snowflakes", !0));
                const t = this.keyArray().filter(t => !e.includes(t));
                return this.set(t)
            }
            set(e) {
                return this.emoji.edit({
                    roles: e
                })
            }
            clone() {
                const e = new this.constructor(this.emoji);
                return e._patch(this.keyArray()), e
            }
            _patch(e) {
                this.clear();
                for (let t of e)(t = this.guild.roles.resolve(t)) && super.set(t.id, t)
            }
        }
    }, function(e, t, s) {
        const i = s(2),
            {
                TypeError: n
            } = s(1);
        e.exports = function(e, t) {
            if ("string" == typeof t && (t = {
                    content: t
                }), t.before && (t.before instanceof Date || (t.before = new Date(t.before)), t.maxID = i.binaryToID((t.before.getTime() - 14200704e5).toString(2) + "0".repeat(22))), t.after && (t.after instanceof Date || (t.after = new Date(t.after)), t.minID = i.binaryToID((t.after.getTime() - 14200704e5).toString(2) + "0".repeat(22))), t.during) {
                t.during instanceof Date || (t.during = new Date(t.during));
                const e = t.during.getTime() - 14200704e5;
                t.minID = i.binaryToID(e.toString(2) + "0".repeat(22)), t.maxID = i.binaryToID((e + 864e5).toString(2) + "0".repeat(22))
            }
            t.channel && (t.channel = e.client.channels.resolveID(t.channel)), t.author && (t.author = e.client.users.resolveID(t.author)), t.mentions && (t.mentions = e.client.users.resolveID(t.options.mentions)), t.sortOrder && (t.sortOrder = {
                ascending: "asc",
                descending: "desc"
            }[t.sortOrder] || t.sortOrder), t = {
                content: t.content,
                max_id: t.maxID,
                min_id: t.minID,
                has: t.has,
                channel_id: t.channel,
                author_id: t.author,
                author_type: t.authorType,
                context_size: t.contextSize,
                sort_by: t.sortBy,
                sort_order: t.sortOrder,
                limit: t.limit,
                offset: t.offset,
                mentions: t.mentions,
                mentions_everyone: t.mentionsEveryone,
                link_hostname: t.linkHostname,
                embed_provider: t.embedProvider,
                embed_type: t.embedType,
                attachment_filename: t.attachmentFilename,
                attachment_extension: t.attachmentExtension,
                include_nsfw: t.nsfw
            };
            const r = s(10),
                o = s(24);
            if (!(e instanceof r || e instanceof o)) throw new n("SEARCH_CHANNEL_TYPE");
            return e.client.api[e instanceof r ? "channels" : "guilds"](e.id).messages().search.get({
                query: t
            }).then(t => {
                const s = t.messages.map(t => t.map(t => e.client.channels.get(t.channel_id).messages.add(t, !1)));
                return {
                    total: t.total_results,
                    results: s
                }
            })
        }
    }, function(e, t, s) {
        const i = s(4),
            n = s(7),
            r = s(16),
            o = s(2),
            a = {
                ALL: "ALL",
                GUILD: "GUILD",
                CHANNEL: "CHANNEL",
                USER: "USER",
                ROLE: "ROLE",
                INVITE: "INVITE",
                WEBHOOK: "WEBHOOK",
                EMOJI: "EMOJI",
                MESSAGE: "MESSAGE",
                UNKNOWN: "UNKNOWN"
            },
            c = {
                ALL: null,
                GUILD_UPDATE: 1,
                CHANNEL_CREATE: 10,
                CHANNEL_UPDATE: 11,
                CHANNEL_DELETE: 12,
                CHANNEL_OVERWRITE_CREATE: 13,
                CHANNEL_OVERWRITE_UPDATE: 14,
                CHANNEL_OVERWRITE_DELETE: 15,
                MEMBER_KICK: 20,
                MEMBER_PRUNE: 21,
                MEMBER_BAN_ADD: 22,
                MEMBER_BAN_REMOVE: 23,
                MEMBER_UPDATE: 24,
                MEMBER_ROLE_UPDATE: 25,
                ROLE_CREATE: 30,
                ROLE_UPDATE: 31,
                ROLE_DELETE: 32,
                INVITE_CREATE: 40,
                INVITE_UPDATE: 41,
                INVITE_DELETE: 42,
                WEBHOOK_CREATE: 50,
                WEBHOOK_UPDATE: 51,
                WEBHOOK_DELETE: 52,
                EMOJI_CREATE: 60,
                EMOJI_UPDATE: 61,
                EMOJI_DELETE: 62,
                MESSAGE_DELETE: 72
            };
        class l {
            constructor(e, t) {
                if (t.users)
                    for (const s of t.users) e.client.users.add(s);
                if (this.webhooks = new i, t.webhooks)
                    for (const s of t.webhooks) this.webhooks.set(s.id, new r(e.client, s));
                this.entries = new i;
                for (const s of t.audit_log_entries) {
                    const t = new h(this, e, s);
                    this.entries.set(t.id, t)
                }
            }
            static build(...e) {
                const t = new l(...e);
                return Promise.all(t.entries.map(e => e.target)).then(() => t)
            }
            static targetType(e) {
                return e < 10 ? a.GUILD : e < 20 ? a.CHANNEL : e < 30 ? a.USER : e < 40 ? a.ROLE : e < 50 ? a.INVITE : e < 60 ? a.WEBHOOK : e < 70 ? a.EMOJI : e < 80 ? a.MESSAGE : a.UNKNOWN
            }
            static actionType(e) {
                return [c.CHANNEL_CREATE, c.CHANNEL_OVERWRITE_CREATE, c.MEMBER_BAN_REMOVE, c.ROLE_CREATE, c.INVITE_CREATE, c.WEBHOOK_CREATE, c.EMOJI_CREATE].includes(e) ? "CREATE" : [c.CHANNEL_DELETE, c.CHANNEL_OVERWRITE_DELETE, c.MEMBER_KICK, c.MEMBER_PRUNE, c.MEMBER_BAN_ADD, c.ROLE_DELETE, c.INVITE_DELETE, c.WEBHOOK_DELETE, c.EMOJI_DELETE, c.MESSAGE_DELETE].includes(e) ? "DELETE" : [c.GUILD_UPDATE, c.CHANNEL_UPDATE, c.CHANNEL_OVERWRITE_UPDATE, c.MEMBER_UPDATE, c.MEMBER_ROLE_UPDATE, c.ROLE_UPDATE, c.INVITE_UPDATE, c.WEBHOOK_UPDATE, c.EMOJI_UPDATE].includes(e) ? "UPDATE" : "ALL"
            }
            toJSON() {
                return o.flatten(this)
            }
        }
        class h {
            constructor(e, t, s) {
                const i = l.targetType(s.action_type);
                if (this.targetType = i, this.actionType = l.actionType(s.action_type), this.action = Object.keys(c).find(e => c[e] === s.action_type), this.reason = s.reason || null, this.executor = t.client.users.get(s.user_id), this.changes = s.changes ? s.changes.map(e => ({
                        key: e.key,
                        old: e.old_value,
                        new: e.new_value
                    })) : null, this.id = s.id, this.extra = null, s.options)
                    if (s.action_type === c.MEMBER_PRUNE) this.extra = {
                        removed: s.options.members_removed,
                        days: s.options.delete_member_days
                    };
                    else if (s.action_type === c.MESSAGE_DELETE) this.extra = {
                    count: s.options.count,
                    channel: t.channels.get(s.options.channel_id)
                };
                else switch (s.options.type) {
                    case "member":
                        this.extra = t.members.get(s.options.id), this.extra || (this.extra = {
                            id: s.options.id
                        });
                        break;
                    case "role":
                        this.extra = t.roles.get(s.options.id), this.extra || (this.extra = {
                            id: s.options.id,
                            name: s.options.role_name
                        })
                }
                if (i === a.UNKNOWN) this.target = this.changes.reduce((e, t) => (e[t.key] = t.new || t.old, e), {}), this.target.id = s.target_id;
                else if ([a.USER, a.GUILD].includes(i)) this.target = t.client[`${i.toLowerCase()}s`].get(s.target_id);
                else if (i === a.WEBHOOK) this.target = e.webhooks.get(s.target_id) || new r(t.client, this.changes.reduce((e, t) => (e[t.key] = t.new || t.old, e), {
                    id: s.target_id,
                    guild_id: t.id
                }));
                else if (i === a.INVITE)
                    if (t.me.permissions.has("MANAGE_GUILD")) {
                        const e = this.changes.find(e => "code" === e.key);
                        this.target = t.fetchInvites().then(t => (this.target = t.find(t => t.code === (e.new || e.old)), this.target))
                    } else this.target = this.changes.reduce((e, t) => (e[t.key] = t.new || t.old, e), {});
                else i === a.MESSAGE ? this.target = t.client.users.get(s.target_id) : this.target = t[`${i.toLowerCase()}s`].get(s.target_id)
            }
            get createdTimestamp() {
                return n.deconstruct(this.id).timestamp
            }
            get createdAt() {
                return new Date(this.createdTimestamp)
            }
            toJSON() {
                return o.flatten(this, {
                    createdTimestamp: !0
                })
            }
        }
        l.Actions = c, l.Targets = a, l.Entry = h, e.exports = l
    }, function(e, t, s) {
        "use strict";

        function i(e) {
            let t = {};
            for (const s of e) t[s] = s;
            return t
        }
        t.RPCCommands = i(["DISPATCH", "AUTHORIZE", "AUTHENTICATE", "GET_GUILD", "GET_GUILDS", "GET_CHANNEL", "GET_CHANNELS", "SUBSCRIBE", "UNSUBSCRIBE", "SET_USER_VOICE_SETTINGS", "SELECT_VOICE_CHANNEL", "GET_SELECTED_VOICE_CHANNEL", "SELECT_TEXT_CHANNEL", "GET_VOICE_SETTINGS", "SET_VOICE_SETTINGS", "CAPTURE_SHORTCUT", "SET_CERTIFIED_DEVICES", "SET_ACTIVITY", "SEND_ACTIVITY_JOIN_INVITE", "SEND_ACTIVITY_JOIN_REQUEST", "CLOSE_ACTIVITY_JOIN_REQUEST", "INVITE_BROWSER", "DEEP_LINK", "CONNECTIONS_CALLBACK", "OVERLAY", "BROWSER_HANDOFF"]), t.RPCEvents = i(["GUILD_STATUS", "GUILD_CREATE", "CHANNEL_CREATE", "VOICE_CHANNEL_SELECT", "VOICE_STATE_CREATE", "VOICE_STATE_DELETE", "VOICE_STATE_UPDATE", "VOICE_SETTINGS_UPDATE", "VOICE_CONNECTION_STATUS", "SPEAKING_START", "SPEAKING_STOP", "GAME_JOIN", "GAME_SPECTATE", "ACTIVITY_JOIN", "ACTIVITY_JOIN_REQUEST", "ACTIVITY_SPECTATE", "NOTIFICATION_CREATE", "MESSAGE_CREATE", "MESSAGE_UPDATE", "MESSAGE_DELETE", "CAPTURE_SHORTCUT_CHANGE", "OVERLAY", "READY", "ERROR"]), t.RPCErrors = {
            UNKNOWN_ERROR: 1e3,
            INVALID_PAYLOAD: 4e3,
            INVALID_VERSION: 4001,
            INVALID_COMMAND: 4002,
            INVALID_GUILD: 4003,
            INVALID_EVENT: 4004,
            INVALID_CHANNEL: 4005,
            INVALID_PERMISSIONS: 4006,
            INVALID_CLIENTID: 4007,
            INVALID_ORIGIN: 4008,
            INVALID_TOKEN: 4009,
            INVALID_USER: 4010,
            INVALID_INVITE: 4011,
            INVALID_ACTIVITY_JOIN_REQUEST: 4012,
            OAUTH2_ERROR: 5e3,
            SELECT_CHANNEL_TIMED_OUT: 5001,
            GET_GUILD_TIMED_OUT: 5002,
            SELECT_VOICE_FORCE_REQUIRED: 5003,
            CAPTURE_SHORTCUT_ALREADY_LISTENING: 5004,
            RICH_PRESENCE_INVALID_SECRET: 5005
        }, t.RPCCloseCodes = {
            CLOSE_NORMAL: 1e3,
            CLOSE_UNSUPPORTED: 1003,
            CLOSE_ABNORMAL: 1006,
            INVALID_CLIENTID: 4e3,
            INVALID_ORIGIN: 4001,
            RATELIMITED: 4002,
            TOKEN_REVOKED: 4003,
            INVALID_VERSION: 4004,
            INVALID_ENCODING: 4005
        }
    }, function(e, t) {}, function(e, t) {}, function(e, t) {}, function(e) {
        e.exports = {
            _from: "github:discordjs/discord.js",
            _id: "discord.js@12.0.0-dev",
            _inBundle: !1,
            _location: "/discord.js",
            _phantomChildren: {},
            _requested: {
                type: "git",
                raw: "discord.js@github:discordjs/discord.js",
                name: "discord.js",
                escapedName: "discord.js",
                rawSpec: "github:discordjs/discord.js",
                saveSpec: "github:discordjs/discord.js",
                fetchSpec: null,
                gitCommittish: null
            },
            _requiredBy: ["#DEV:/", "/discord-rpc"],
            _resolved: "github:discordjs/discord.js#b186472785db6bbe7de37e1a75104d79dd0cc44f",
            _spec: "discord.js@github:discordjs/discord.js",
            _where: "C:\\Users\\Massimo Tseng\\Desktop\\RPC-master\\node_modules\\discord-rpc",
            author: {
                name: "Amish Shah",
                email: "amishshah.2k@gmail.com"
            },
            browser: {
                https: !1,
                ws: !1,
                uws: !1,
                erlpack: !1,
                "prism-media": !1,
                opusscript: !1,
                "node-opus": !1,
                tweetnacl: !1,
                sodium: !1,
                "zlib-sync": !1,
                "src/sharding/Shard.js": !1,
                "src/sharding/ShardClientUtil.js": !1,
                "src/sharding/ShardingManager.js": !1,
                "src/client/voice/ClientVoiceManager.js": !1,
                "src/client/voice/VoiceConnection.js": !1,
                "src/client/voice/networking/VoiceUDPClient.js": !1,
                "src/client/voice/networking/VoiceWebSocket.js": !1,
                "src/client/voice/dispatcher/StreamDispatcher.js": !1,
                "src/client/voice/player/AudioPlayer.js": !1,
                "src/client/voice/receiver/PacketHandler.js": !1,
                "src/client/voice/receiver/Receiver.js": !1,
                "src/client/voice/util/Secretbox.js": !1,
                "src/client/voice/util/VolumeInterface.js": !1,
                "src/client/voice/VoiceBroadcast.js": !1
            },
            bugs: {
                url: "https://github.com/discordjs/discord.js/issues"
            },
            bundleDependencies: !1,
            dependencies: {
                pako: "^1.0.0",
                "prism-media": "^0.2.0",
                snekfetch: "^3.6.0",
                tweetnacl: "^1.0.0",
                ws: "^4.0.0"
            },
            deprecated: !1,
            description: "A powerful library for interacting with the Discord API",
            devDependencies: {
                "@types/node": "^9.4.6",
                "discord.js-docgen": "github:discordjs/docgen",
                eslint: "^4.17.0",
                "json-filter-loader": "^1.0.0",
                "uglifyjs-webpack-plugin": "^1.1.8",
                webpack: "^4.5.0",
                "webpack-cli": "^2.0.14"
            },
            engines: {
                node: ">=8.0.0"
            },
            homepage: "https://github.com/discordjs/discord.js#readme",
            keywords: ["discord", "api", "bot", "client", "node", "discordapp"],
            license: "Apache-2.0",
            main: "./src/index",
            name: "discord.js",
            peerDependencies: {
                bufferutil: "^3.0.0",
                erlpack: "discordapp/erlpack",
                "libsodium-wrappers": "^0.7.0",
                sodium: "^2.0.0",
                uws: "^9.14.0",
                "zlib-sync": "^0.1.0"
            },
            repository: {
                type: "git",
                url: "git+https://github.com/discordjs/discord.js.git"
            },
            runkitExampleFilename: "./docs/examples/ping.js",
            scripts: {
                "build:browser": "webpack",
                docs: "docgen --source src --custom docs/index.yml --output docs/docs.json",
                "docs:test": "docgen --source src --custom docs/index.yml",
                lint: "eslint src *.js",
                "lint:fix": "eslint --fix src",
                prepublishOnly: "npm run test && NODE_ENV=production npm run build:browser",
                test: "npm run lint && npm run docs:test"
            },
            types: "./typings/index.d.ts",
            unpkg: "./webpack/discord.min.js",
            version: "12.0.0-dev"
        }
    }, function(e, t, s) {
        const {
            browser: i
        } = s(3), n = s(26);
        try {
            var r = s(79);
            r.pack || (r = null)
        } catch (e) {}
        if (i) t.WebSocket = window.WebSocket;
        else try {
            t.WebSocket = s(78)
        } catch (e) {
            t.WebSocket = s(77)
        }
        t.encoding = r ? "etf" : "json", t.pack = r ? r.pack : JSON.stringify, t.unpack = (e => r && "{" !== e[0] ? (e instanceof Buffer || (e = Buffer.from(new Uint8Array(e))), r.unpack(e)) : JSON.parse(e)), t.create = ((e, s = {}, ...r) => {
            const [o, a] = e.split("?");
            s.encoding = t.encoding, a && (s = Object.assign(n.parse(a), s));
            const c = new t.WebSocket(`${o}?${n.stringify(s)}`, ...r);
            return i && (c.binaryType = "arraybuffer"), c
        });
        for (const e of ["CONNECTING", "OPEN", "CLOSING", "CLOSED"]) t[e] = t.WebSocket[e]
    }, function(e, t, s) {
        "use strict";
        const i = s(25),
            n = s(81);
        e.exports = class extends i {
            constructor(e) {
                super(), this.client = e, this.ws = null, this.tries = 0
            }
            connect(e, t = this.tries) {
                if (this.connected) return;
                const s = 6463 + t % 10;
                this.hostAndPort = `127.0.0.1:${s}`;
                const i = this.client.clientID,
                    r = this.ws = n.create(`ws://${this.hostAndPort}/`, {
                        v: 1,
                        client_id: i || null
                    }, "undefined" == typeof window ? {
                        origin: this.client.options._login.origin
                    } : void 0);
                r.onopen = this.onOpen.bind(this), r.onclose = r.onerror = this.onClose.bind(this), r.onmessage = this.onMessage.bind(this)
            }
            send(e) {
                this.ws && this.ws.send(n.pack(e))
            }
            close() {
                this.ws && this.ws.close()
            }
            ping() {}
            onMessage(e) {
                this.emit("message", n.unpack(e.data))
            }
            onOpen() {
                this.client.rest.endpoint = `http://${this.hostAndPort}`, this.client.rest.versioned = !1, this.emit("open")
            }
            onClose(e) {
                try {
                    this.ws.close()
                } catch (e) {}
                const t = e.code >= 4e3 && e.code < 5e3;
                e.code && !t || this.emit("close", e), t || setTimeout(() => this.connect(void 0, 1006 === e.code ? ++this.tries : 0), 250)
            }
        }, e.exports.encode = n.pack, e.exports.decode = n.unpack
    }, function(e, t) {}, function(e, t, s) {
        "use strict";
        e.exports = {
            ipc: s(83),
            websocket: s(82)
        }
    }, function(e, t) {}, function(e, t) {
        e.exports = {
            buildRequest: function(e, t) {
                return {
                    method: e,
                    path: t,
                    redirect: this.options.followRedirects ? "follow" : "manual",
                    headers: {},
                    setHeader(e, t) {
                        this.headers[e.toLowerCase()] = t
                    },
                    getHeader(e) {
                        return this.headers[e.toLowerCase()]
                    }
                }
            },
            finalizeRequest: function() {
                return this._finalizeRequest(), this.data && (this.request.body = this.data), window.fetch(this.request.path, this.request).then(e => e.text().then(t => {
                    const s = {};
                    for (const [t, i] of e.headers.entries()) s[t.toLowerCase()] = i;
                    return {
                        response: e,
                        raw: t,
                        headers: s
                    }
                }))
            },
            shouldSendRaw: () => !1,
            METHODS: ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "PATCH"],
            STATUS_CODES: {},
            Extension: Object,
            FormData: window.FormData
        }
    }, function(e, t, s) {
        "use strict";
        var i = function(e) {
            switch (typeof e) {
                case "string":
                    return e;
                case "boolean":
                    return e ? "true" : "false";
                case "number":
                    return isFinite(e) ? e : "";
                default:
                    return ""
            }
        };
        e.exports = function(e, t, s, a) {
            return t = t || "&", s = s || "=", null === e && (e = void 0), "object" == typeof e ? r(o(e), function(o) {
                var a = encodeURIComponent(i(o)) + s;
                return n(e[o]) ? r(e[o], function(e) {
                    return a + encodeURIComponent(i(e))
                }).join(t) : a + encodeURIComponent(i(e[o]))
            }).join(t) : a ? encodeURIComponent(i(a)) + s + encodeURIComponent(i(e)) : ""
        };
        var n = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        };

        function r(e, t) {
            if (e.map) return e.map(t);
            for (var s = [], i = 0; i < e.length; i++) s.push(t(e[i], i));
            return s
        }
        var o = Object.keys || function(e) {
            var t = [];
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.push(s);
            return t
        }
    }, function(e, t, s) {
        "use strict";

        function i(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        e.exports = function(e, t, s, r) {
            t = t || "&", s = s || "=";
            var o = {};
            if ("string" != typeof e || 0 === e.length) return o;
            var a = /\+/g;
            e = e.split(t);
            var c = 1e3;
            r && "number" == typeof r.maxKeys && (c = r.maxKeys);
            var l = e.length;
            c > 0 && l > c && (l = c);
            for (var h = 0; h < l; ++h) {
                var u, d, p, m, f = e[h].replace(a, "%20"),
                    E = f.indexOf(s);
                E >= 0 ? (u = f.substr(0, E), d = f.substr(E + 1)) : (u = f, d = ""), p = decodeURIComponent(u), m = decodeURIComponent(d), i(o, p) ? n(o[p]) ? o[p].push(m) : o[p] = [o[p], m] : o[p] = m
            }
            return o
        };
        var n = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
    }, function(e, t, s) {
        const i = "undefined" != typeof window,
            n = s(26),
            r = s(i ? 86 : 85);
        class o extends r.Extension {
            constructor(e, t, s = {}) {
                super(), this.options = Object.assign({
                    version: 1,
                    qs: n,
                    followRedirects: !0
                }, s), this.request = r.buildRequest.call(this, e, t, s), s.headers && this.set(s.headers), s.query && this.query(s.query), s.data && this.send(s.data)
            }
            query(e, t) {
                if (this.request.query || (this.request.query = {}), null !== e && "object" == typeof e)
                    for (const [t, s] of Object.entries(e)) this.query(t, s);
                else this.request.query[e] = t;
                return this
            }
            set(e, t) {
                if (null !== e && "object" == typeof e)
                    for (const t of Object.keys(e)) this.set(t, e[t]);
                else this.request.setHeader(e, t);
                return this
            }
            attach(...e) {
                const t = this.data instanceof r.FormData ? this.data : this.data = new r.FormData;
                if ("object" == typeof e[0])
                    for (const [t, s] of Object.entries(e[0])) this.attach(t, s);
                else t.append(...e);
                return this
            }
            send(e) {
                if (e instanceof r.FormData || r.shouldSendRaw(e)) this.data = e;
                else if (null !== e && "object" == typeof e) {
                    const t = this.request.getHeader("content-type");
                    let s;
                    t ? t.includes("json") ? s = JSON.stringify : t.includes("urlencoded") && (s = this.options.qs.stringify) : (this.set("Content-Type", "application/json"), s = JSON.stringify), this.data = s(e)
                } else this.data = e;
                return this
            }
            then(e, t) {
                return this._response ? this._response.then(e, t) : this._response = r.finalizeRequest.call(this).then(({
                    response: e,
                    raw: t,
                    redirect: s,
                    headers: i
                }) => {
                    if (s) {
                        let t = this.request.method;
                        [301, 302].includes(e.statusCode) ? ("HEAD" !== t && (t = "GET"), this.data = null) : 303 === e.statusCode && (t = "GET");
                        const i = this.request.getHeaders();
                        return delete i.host, new o(t, s, {
                            data: this.data,
                            headers: i,
                            version: this.options.version
                        })
                    }
                    const n = e.statusCode || e.status,
                        a = this,
                        c = {
                            request: this.request,
                            get body() {
                                delete c.body;
                                const e = this.headers["content-type"];
                                if (e && e.includes("application/json")) try {
                                    c.body = JSON.parse(c.text)
                                } catch (e) {
                                    c.body = c.text
                                } else e && e.includes("application/x-www-form-urlencoded") ? c.body = a.options.qs.parse(c.text) : c.body = t;
                                return c.body
                            },
                            text: t.toString(),
                            ok: n >= 200 && n < 400,
                            headers: i || e.headers,
                            status: n,
                            statusText: e.statusText || r.STATUS_CODES[e.statusCode]
                        };
                    if (c.ok) return c; {
                        const e = new Error(`${c.status} ${c.statusText}`.trim());
                        return Object.assign(e, c), Promise.reject(e)
                    }
                }).then(e, t)
            } catch (e) {
                return this.then(null, e)
            }
            end(e) {
                return this.then(t => e ? e(null, t) : t, t => e ? e(t, t.status ? t : null) : Promise.reject(t))
            }
            _finalizeRequest() {
                if (this.request && ("HEAD" !== this.request.method && this.set("Accept-Encoding", "gzip, deflate"), this.data && this.data.getBoundary && this.set("Content-Type", `multipart/form-data; boundary=${this.data.getBoundary()}`), this.request.query)) {
                    const [e, t] = this.request.path.split("?");
                    this.request.path = `${e}?${this.options.qs.stringify(this.request.query)}${t?`&${t}`:""}`
                }
            }
        }
        o.METHODS = r.METHODS.concat("BREW").filter(e => "M-SEARCH" !== e);
        for (const e of o.METHODS) o[e.toLowerCase()] = function(t, s) {
            return new(this.prototype instanceof o ? this : o)(e, t, s)
        };
        e.exports = o
    }, function(e, t, s) {
        (function(e) {
            ! function(e, t) {
                "use strict";
                if (!e.setImmediate) {
                    var s, i, n, r, o, a = 1,
                        c = {},
                        l = !1,
                        h = e.document,
                        u = Object.getPrototypeOf && Object.getPrototypeOf(e);
                    u = u && u.setTimeout ? u : e, "[object process]" === {}.toString.call(e.process) ? s = function(e) {
                        process.nextTick(function() {
                            p(e)
                        })
                    } : ! function() {
                        if (e.postMessage && !e.importScripts) {
                            var t = !0,
                                s = e.onmessage;
                            return e.onmessage = function() {
                                t = !1
                            }, e.postMessage("", "*"), e.onmessage = s, t
                        }
                    }() ? e.MessageChannel ? ((n = new MessageChannel).port1.onmessage = function(e) {
                        p(e.data)
                    }, s = function(e) {
                        n.port2.postMessage(e)
                    }) : h && "onreadystatechange" in h.createElement("script") ? (i = h.documentElement, s = function(e) {
                        var t = h.createElement("script");
                        t.onreadystatechange = function() {
                            p(e), t.onreadystatechange = null, i.removeChild(t), t = null
                        }, i.appendChild(t)
                    }) : s = function(e) {
                        setTimeout(p, 0, e)
                    } : (r = "setImmediate$" + Math.random() + "$", o = function(t) {
                        t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(r) && p(+t.data.slice(r.length))
                    }, e.addEventListener ? e.addEventListener("message", o, !1) : e.attachEvent("onmessage", o), s = function(t) {
                        e.postMessage(r + t, "*")
                    }), u.setImmediate = function(e) {
                        "function" != typeof e && (e = new Function("" + e));
                        for (var t = new Array(arguments.length - 1), i = 0; i < t.length; i++) t[i] = arguments[i + 1];
                        var n = {
                            callback: e,
                            args: t
                        };
                        return c[a] = n, s(a), a++
                    }, u.clearImmediate = d
                }

                function d(e) {
                    delete c[e]
                }

                function p(e) {
                    if (l) setTimeout(p, 0, e);
                    else {
                        var s = c[e];
                        if (s) {
                            l = !0;
                            try {
                                ! function(e) {
                                    var s = e.callback,
                                        i = e.args;
                                    switch (i.length) {
                                        case 0:
                                            s();
                                            break;
                                        case 1:
                                            s(i[0]);
                                            break;
                                        case 2:
                                            s(i[0], i[1]);
                                            break;
                                        case 3:
                                            s(i[0], i[1], i[2]);
                                            break;
                                        default:
                                            s.apply(t, i)
                                    }
                                }(s)
                            } finally {
                                d(e), l = !1
                            }
                        }
                    }
                }
            }("undefined" == typeof self ? void 0 === e ? this : e : self)
        }).call(this, s(39))
    }, function(e, t, s) {
        (function(e) {
            var i = void 0 !== e && e || "undefined" != typeof self && self || window,
                n = Function.prototype.apply;

            function r(e, t) {
                this._id = e, this._clearFn = t
            }
            t.setTimeout = function() {
                return new r(n.call(setTimeout, i, arguments), clearTimeout)
            }, t.setInterval = function() {
                return new r(n.call(setInterval, i, arguments), clearInterval)
            }, t.clearTimeout = t.clearInterval = function(e) {
                e && e.close()
            }, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
                this._clearFn.call(i, this._id)
            }, t.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = t
            }, t.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
            }, t._unrefActive = t.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                }, t))
            }, s(90), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
        }).call(this, s(39))
    }, function(e, t, s) {
        "use strict";
        const {
            setTimeout: i,
            clearTimeout: n
        } = s(91), r = s(21), o = s(84), {
            RPCCommands: a,
            RPCEvents: c
        } = s(76), {
            pid: l
        } = s(40), h = s(4), u = s(3), d = s(7), p = s(38), m = s(24), f = s(10), E = s(12), g = s(27), {
            Error: _,
            TypeError: T
        } = s(1);

        function I(e) {
            return {
                has: () => !1,
                delete: () => !1,
                get: () => void 0,
                create: e
            }
        }

        function y(e, t) {
            return `${e}${JSON.stringify(t)}`
        }
        e.exports = class extends g {
            constructor(e = {}) {
                super(Object.assign({
                    _tokenType: "Bearer"
                }, e)), this.accessToken = null, this.clientID = null, this.application = null, this.user = null;
                const t = o[e.transport];
                if (!t) throw new T("RPC_INVALID_TRANSPORT", e.transport);
                this.transport = new t(this), this.transport.on("message", this._onRpcMessage.bind(this)), this._expecting = new Map, this._subscriptions = new Map, this.users = I(e => new E(this, e)), this.channels = I((e, t) => f.create(this, e, t)), this.guilds = I(e => new m(this, e))
            }
            login(e, t) {
                return new Promise((s, r) => {
                    this.clientID = e, this.options._login = t || {};
                    const o = i(() => r(new _("RPC_CONNECTION_TIMEOUT")), 1e4);
                    o.unref(), this.once("connected", () => {
                        n(o), s(this)
                    }), this.transport.once("close", r), this.transport.connect({
                        client_id: this.clientID
                    })
                }).then(() => t ? t.accessToken ? this.authenticate(t.accessToken) : this.authorize(t) : (this.emit("ready"), this))
            }
            request(e, t, s) {
                return new Promise((i, n) => {
                    const r = d.generate();
                    this.transport.send({
                        cmd: e,
                        args: t,
                        evt: s,
                        nonce: r
                    }), this._expecting.set(r, {
                        resolve: i,
                        reject: n
                    })
                })
            }
            _onRpcMessage(e) {
                if (e.cmd === a.DISPATCH && e.evt === c.READY) this.emit("connected"), e.data.user && (this.user = this.users.create(e.data.user));
                else if (this._expecting.has(e.nonce)) {
                    const {
                        resolve: t,
                        reject: s
                    } = this._expecting.get(e.nonce);
                    "ERROR" === e.evt ? s(new _("RPC_CLIENT_ERROR", `${e.data.code} ${e.data.message}`)) : t(e.data), this._expecting.delete(e.nonce)
                } else {
                    const t = y(e.evt, e.args);
                    if (!this._subscriptions.has(t)) return;
                    this._subscriptions.get(t)(e.data)
                }
            }
            async authorize({
                rpcToken: e,
                scopes: t,
                clientSecret: s,
                tokenEndpoint: i
            }) {
                i && !e ? e = await r.get(i).then(e => e.body.rpc_token) : s && !0 === e && (e = await this.api.oauth2.token.rpc.post({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        client_id: this.clientID,
                        client_secret: s
                    }
                }));
                const {
                    code: n
                } = await this.request("AUTHORIZE", {
                    client_id: this.clientID,
                    scopes: t,
                    rpc_token: e
                });
                if (i) {
                    const e = await r.post(i).send({
                        code: n
                    });
                    return this.authenticate(e.body.access_token)
                }
                if (s) {
                    const {
                        access_token: e
                    } = await this.api.oauth2.token.post({
                        query: {
                            client_id: this.clientID,
                            client_secret: s,
                            code: n,
                            grant_type: "authorization_code"
                        },
                        auth: !1
                    });
                    return this.authenticate(e)
                }
                return {
                    code: n
                }
            }
            authenticate(e) {
                return this.accessToken = e, this.request("AUTHENTICATE", {
                    access_token: e
                }).then(({
                    application: e,
                    user: t
                }) => (this.application = new p(this, e), this.user ? this.user._patch(t) : this.user = this.users.create(t), this.emit("ready"), this))
            }
            getGuild(e, t) {
                return this.request(a.GET_GUILD, {
                    guild_id: e,
                    timeout: t
                }).then(e => this.guilds.create(e))
            }
            getGuilds(e) {
                return this.request(a.GET_GUILDS, {
                    timeout: e
                }).then(({
                    guilds: e
                }) => {
                    const t = new h;
                    for (const s of e) t.set(s.id, this.guilds.create(s));
                    return t
                })
            }
            getChannel(e, t) {
                return this.request(a.GET_CHANNEL, {
                    channel_id: e,
                    timeout: t
                }).then(e => e.guild_id ? this.getGuild(e.guild_id) : f.create(this, e))
            }
            getChannels(e) {
                return this.request(a.GET_CHANNELS, {
                    timeout: e
                }).then(async ({
                    channels: e
                }) => {
                    const t = new h,
                        s = new h;
                    for (const i of e) {
                        const {
                            guild_id: e
                        } = i;
                        e && !t.has(e) && t.set(e, await this.getGuild(e)), s.set(i.id, this.channels.create(i, t.get(i.guild_id)))
                    }
                    return s
                })
            }
            setCertifiedDevices(e) {
                return this.request(a.SET_CERTIFIED_DEVICES, {
                    devices: e.map(e => ({
                        type: u.DeviceTypes[e.type],
                        id: e.uuid,
                        vendor: e.vendor,
                        model: e.model,
                        related: e.related,
                        echo_cancellation: e.echoCancellation,
                        noise_suppression: e.noiseSuppression,
                        automatic_gain_control: e.automaticGainControl,
                        hardware_mute: e.hardwareMute
                    }))
                })
            }
            setUserVoiceSettings(e, t) {
                return this.request(a.SET_USER_VOICE_SETTINGS, {
                    user_id: e,
                    pan: t.pan,
                    mute: t.mute,
                    volume: t.volume
                })
            }
            selectVoiceChannel(e, {
                timeout: t,
                force: s = !1
            } = {}) {
                return this.request(a.SELECT_VOICE_CHANNEL, {
                    channel_id: e,
                    timeout: t,
                    force: s
                })
            }
            selectTextChannel(e, {
                timeout: t,
                force: s = !1
            } = {}) {
                return this.request(a.SELECT_TEXT_CHANNEL, {
                    channel_id: e,
                    timeout: t,
                    force: s
                })
            }
            getVoiceSettings() {
                return this.request(a.GET_VOICE_SETTINGS).then(e => ({
                    automaticGainControl: e.automatic_gain_control,
                    echoCancellation: e.echo_cancellation,
                    noiseSuppression: e.noise_suppression,
                    qos: e.qos,
                    silenceWarning: e.silence_warning,
                    deaf: e.deaf,
                    mute: e.mute,
                    input: {
                        availableDevices: e.input.available_devices,
                        device: e.input.device_id,
                        volume: e.input.volume
                    },
                    output: {
                        availableDevices: e.output.available_devices,
                        device: e.output.device_id,
                        volume: e.output.volume
                    },
                    mode: {
                        type: e.mode.type,
                        autoThreshold: e.mode.auto_threshold,
                        threshold: e.mode.threshold,
                        shortcut: e.mode.shortcut.map(e => ({
                            name: e.name,
                            code: e.code,
                            type: Object.keys(u.KeyTypes)[e.type]
                        })),
                        delay: e.mode.delay
                    }
                }))
            }
            setVoiceSettings(e) {
                return this.request(a.SET_VOICE_SETTINGS, {
                    automatic_gain_control: e.automaticGainControl,
                    echo_cancellation: e.echoCancellation,
                    noise_suppression: e.noiseSuppression,
                    qos: e.qos,
                    silence_warning: e.silenceWarning,
                    deaf: e.deaf,
                    mute: e.mute,
                    input: e.input ? {
                        device_id: e.input.device,
                        volume: e.input.volume
                    } : void 0,
                    output: e.output ? {
                        device_id: e.output.device,
                        volume: e.output.volume
                    } : void 0,
                    mode: e.mode ? {
                        mode: e.mode.type,
                        auto_threshold: e.mode.autoThreshold,
                        threshold: e.mode.threshold,
                        shortcut: e.mode.shortcut.map(e => ({
                            name: e.name,
                            code: e.code,
                            type: u.KeyTypes[e.type.toUpperCase()]
                        })),
                        delay: e.mode.delay
                    } : void 0
                })
            }
            captureShortcut(e) {
                const t = y(c.CAPTURE_SHORTCUT_CHANGE),
                    s = () => (this._subscriptions.delete(t), this.request(a.CAPTURE_SHORTCUT, {
                        action: "STOP"
                    }));
                return this._subscriptions.set(t, ({
                    shortcut: t
                }) => {
                    const i = t.map(e => ({
                        name: e.name,
                        code: e.code,
                        type: Object.keys(u.KeyTypes)[e.type]
                    }));
                    e(i, s)
                }), this.request(a.CAPTURE_SHORTCUT, {
                    action: "START"
                }).then(() => s)
            }
            setActivity(e = {}, t = l()) {
                let s, i, n, r;
                return (e.startTimestamp || e.endTimestamp) && ((s = {
                    start: e.startTimestamp,
                    end: e.endTimestamp
                }).start instanceof Date && (s.start = Math.round(s.start.getTime() / 1e3)), s.end instanceof Date && (s.end = Math.round(s.end.getTime() / 1e3))), (e.largeImageKey || e.largeImageText || e.smallImageKey || e.smallImageText) && (i = {
                    large_image: e.largeImageKey,
                    large_text: e.largeImageText,
                    small_image: e.smallImageKey,
                    small_text: e.smallImageText
                }), (e.partySize || e.partyId || e.partyMax) && (n = {
                    id: e.partyId
                }, (e.partySize || e.partyMax) && (n.size = [e.partySize, e.partyMax])), (e.matchSecret || e.joinSecret || e.spectateSecret) && (r = {
                    match: e.matchSecret,
                    join: e.joinSecret,
                    spectate: e.spectateSecret
                }), this.request(a.SET_ACTIVITY, {
                    pid: t,
                    activity: {
                        state: e.state,
                        details: e.details,
                        timestamps: s,
                        assets: i,
                        party: n,
                        secrets: r,
                        instance: !!e.instance
                    }
                })
            }
            clearActivity(e = l()) {
                return this.request(a.SET_ACTIVITY, {
                    pid: e
                })
            }
            sendJoinInvite(e) {
                return this.request(a.SEND_ACTIVITY_JOIN_INVITE, {
                    user_id: e.id ? e.id : e
                })
            }
            sendJoinRequest(e) {
                return this.request(a.SEND_ACTIVITY_JOIN_REQUEST, {
                    user_id: e.id ? e.id : e
                })
            }
            closeJoinRequest(e) {
                return this.request(a.CLOSE_ACTIVITY_JOIN_REQUEST, {
                    user_id: e.id ? e.id : e
                })
            }
            subscribe(e, t, s) {
                return s || "function" != typeof t || (s = t, t = void 0), this.request(a.SUBSCRIBE, t, e).then(() => {
                    const i = y(e, t);
                    return this._subscriptions.set(i, s), {
                        unsubscribe: () => this.request(a.UNSUBSCRIBE, t, e).then(() => this._subscriptions.delete(i))
                    }
                })
            }
            async destroy() {
                super.destroy(), this.transport.close()
            }
        }
    }, function(e, t) {}, function(e, t) {}, function(e, t, s) {
        const {
            register: i
        } = s(41), n = {
            CLIENT_INVALID_OPTION: (e, t) => `The ${e} option must be ${t}`,
            TOKEN_INVALID: "An invalid token was provided.",
            TOKEN_MISSING: "Request to use token, but token was unavailable to the client.",
            FEATURE_USER_ONLY: "Only user accounts are able to make use of this feature.",
            WS_CONNECTION_TIMEOUT: "The connection to the gateway timed out.",
            WS_CONNECTION_EXISTS: "There is already an existing WebSocket connection.",
            WS_NOT_OPEN: (e = "data") => `Websocket not open to send ${e}`,
            PERMISSION_INVALID: "Invalid permission string or number.",
            RATELIMIT_INVALID_METHOD: "Unknown rate limiting method.",
            SHARDING_INVALID: "Invalid shard settings were provided.",
            SHARDING_REQUIRED: "This session would have handled too many guilds - Sharding is required.",
            SHARDING_CHILD_CONNECTION: "Failed to send message to shard's process.",
            SHARDING_PARENT_CONNECTION: "Failed to send message to master process.",
            SHARDING_NO_SHARDS: "No shards have been spawned.",
            SHARDING_IN_PROCESS: "Shards are still being spawned.",
            SHARDING_ALREADY_SPAWNED: e => `Already spawned ${e} shards.`,
            SHARDING_PROCESS_EXISTS: e => `Shard ${e} already has an active process.`,
            SHARDING_READY_TIMEOUT: e => `Shard ${e}'s Client took too long to become ready.`,
            SHARDING_READY_DISCONNECTED: e => `Shard ${e}'s Client disconnected before becoming ready.`,
            SHARDING_READY_DIED: e => `Shard ${e}'s process exited before its Client became ready.`,
            COLOR_RANGE: "Color must be within the range 0 - 16777215 (0xFFFFFF).",
            COLOR_CONVERT: "Unable to convert color to a number.",
            EMBED_FIELD_COUNT: "MessageEmbeds may not exceed 25 fields.",
            EMBED_FIELD_NAME: "MessageEmbed field names may not be empty.",
            EMBED_FIELD_VALUE: "MessageEmbed field values may not be empty.",
            FILE_NOT_FOUND: e => `File could not be found: ${e}`,
            USER_NO_DMCHANNEL: "No DM Channel exists!",
            VOICE_INVALID_HEARTBEAT: "Tried to set voice heartbeat but no valid interval was specified.",
            VOICE_USER_MISSING: "Couldn't resolve the user to create stream.",
            VOICE_STREAM_EXISTS: "There is already an existing stream for that user.",
            VOICE_JOIN_CHANNEL: (e = !1) => `You do not have permission to join this voice channel${e?"; it is full.":"."}`,
            VOICE_CONNECTION_TIMEOUT: "Connection not established within 15 seconds.",
            VOICE_TOKEN_ABSENT: "Token not provided from voice server packet.",
            VOICE_SESSION_ABSENT: "Session ID not supplied.",
            VOICE_INVALID_ENDPOINT: "Invalid endpoint received.",
            VOICE_NO_BROWSER: "Voice connections are not available in browsers.",
            VOICE_CONNECTION_ATTEMPTS_EXCEEDED: e => `Too many connection attempts (${e}).`,
            VOICE_JOIN_SOCKET_CLOSED: "Tried to send join packet, but the WebSocket is not open.",
            VOICE_PLAY_INTERFACE_NO_BROADCAST: "A broadcast cannot be played in this context.",
            VOICE_PLAY_INTERFACE_BAD_TYPE: "Unknown stream type",
            VOICE_PRISM_DEMUXERS_NEED_STREAM: "To play a webm/ogg stream, you need to pass a ReadableStream.",
            OPUS_ENGINE_MISSING: "Couldn't find an Opus engine.",
            UDP_SEND_FAIL: "Tried to send a UDP packet, but there is no socket available.",
            UDP_ADDRESS_MALFORMED: "Malformed UDP address or port.",
            UDP_CONNECTION_EXISTS: "There is already an existing UDP connection.",
            REQ_BODY_TYPE: "The response body isn't a Buffer.",
            REQ_RESOURCE_TYPE: "The resource must be a string, Buffer or a valid file stream.",
            IMAGE_FORMAT: e => `Invalid image format: ${e}`,
            IMAGE_SIZE: e => `Invalid image size: ${e}`,
            MESSAGE_MISSING: "Message not found",
            MESSAGE_BULK_DELETE_TYPE: "The messages must be an Array, Collection, or number.",
            MESSAGE_NONCE_TYPE: "Message nonce must fit in an unsigned 64-bit integer.",
            TYPING_COUNT: "Count must be at least 1",
            SPLIT_MAX_LEN: "Message exceeds the max length and contains no split characters.",
            BAN_RESOLVE_ID: (e = !1) => `Couldn't resolve the user ID to ${e?"ban":"unban"}.`,
            PRUNE_DAYS_TYPE: "Days must be a number",
            SEARCH_CHANNEL_TYPE: "Target must be a TextChannel, DMChannel, GroupDMChannel, or Guild.",
            MESSAGE_SPLIT_MISSING: "Message exceeds the max length and contains no split characters.",
            GUILD_CHANNEL_RESOLVE: "Could not resolve channel to a guild channel.",
            GUILD_CHANNEL_ORPHAN: "Could not find a parent to this guild channel.",
            GUILD_OWNED: "Guild is owned by the client.",
            GUILD_RESTRICTED: (e = !1) => `Guild is ${e?"already":"not"} restricted.`,
            GUILD_MEMBERS_TIMEOUT: "Members didn't arrive in time.",
            INVALID_TYPE: (e, t, s = !1) => `Supplied ${e} is not a${s?"n":""} ${t}.`,
            WEBHOOK_MESSAGE: "The message was not sent by a webhook.",
            EMOJI_TYPE: "Emoji must be a string or GuildEmoji/ReactionEmoji",
            REACTION_RESOLVE_USER: "Couldn't resolve the user ID to remove from the reaction."
        };
        for (const [e, t] of Object.entries(n)) i(e, t)
    }, function(e, t, s) {
        "use strict";
        const i = s(1),
            n = s(40);
        i.register("RPC_INVALID_TRANSPORT", e => `Invalid transport: ${e}`), i.register("RPC_CLIENT_ERROR", e => e), i.register("RPC_CONNECTION_TIMEOUT", e => e), e.exports = {
            Client: s(92),
            register: e => n.register(`discord-${e}`)
        }
    }])
});