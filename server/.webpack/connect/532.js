"use strict";exports.id=532,exports.ids=[532],exports.modules={5532:(it,pe,a)=>{a.d(pe,{GetRoleCredentialsCommand:()=>Ne,SSOClient:()=>ot});var $=a(3551),me=a(3774),o=a(112);const ye=e=>({...e,useDualstackEndpoint:e.useDualstackEndpoint??!1,useFipsEndpoint:e.useFipsEndpoint??!1,defaultSigningName:"awsssoportal"}),ge={UseFIPS:{type:"builtInParams",name:"useFipsEndpoint"},Endpoint:{type:"builtInParams",name:"endpoint"},Region:{type:"builtInParams",name:"region"},UseDualStack:{type:"builtInParams",name:"useDualstackEndpoint"}};class m extends o.TJ{constructor(t){super(t),Object.setPrototypeOf(this,m.prototype)}}class O extends m{constructor(t){super({name:"InvalidRequestException",$fault:"client",...t}),this.name="InvalidRequestException",this.$fault="client",Object.setPrototypeOf(this,O.prototype)}}class k extends m{constructor(t){super({name:"ResourceNotFoundException",$fault:"client",...t}),this.name="ResourceNotFoundException",this.$fault="client",Object.setPrototypeOf(this,k.prototype)}}class N extends m{constructor(t){super({name:"TooManyRequestsException",$fault:"client",...t}),this.name="TooManyRequestsException",this.$fault="client",Object.setPrototypeOf(this,N.prototype)}}class z extends m{constructor(t){super({name:"UnauthorizedException",$fault:"client",...t}),this.name="UnauthorizedException",this.$fault="client",Object.setPrototypeOf(this,z.prototype)}}const Se=e=>({...e,...e.accessToken&&{accessToken:o.$H}}),fe=e=>({...e,...e.secretAccessKey&&{secretAccessKey:o.$H},...e.sessionToken&&{sessionToken:o.$H}}),ve=e=>({...e,...e.roleCredentials&&{roleCredentials:fe(e.roleCredentials)}}),dt=e=>({...e,...e.accessToken&&{accessToken:SENSITIVE_STRING}}),ct=e=>({...e,...e.accessToken&&{accessToken:SENSITIVE_STRING}}),lt=e=>({...e,...e.accessToken&&{accessToken:SENSITIVE_STRING}});var f=a(3766);const xe=async(e,t)=>{const s=(0,f.lI)(e,t),n=(0,o.Tj)({},E,{[b]:e[C]});s.bp("/federation/credentials");const r=(0,o.Tj)({[Te]:[,(0,o.Y0)(e[we],"roleName")],[_]:[,(0,o.Y0)(e[j],"accountId")]});let i;return s.m("GET").h(n).q(r).b(i),s.build()},ut=async(e,t)=>{const s=rb(e,t),n=map({},E,{[b]:e[C]});s.bp("/assignment/roles");const r=map({[U]:[,e[G]],[M]:[()=>e.maxResults!==void 0,()=>e[H].toString()],[_]:[,__expectNonNull(e[j],"accountId")]});let i;return s.m("GET").h(n).q(r).b(i),s.build()},ht=async(e,t)=>{const s=rb(e,t),n=map({},E,{[b]:e[C]});s.bp("/assignment/accounts");const r=map({[U]:[,e[G]],[M]:[()=>e.maxResults!==void 0,()=>e[H].toString()]});let i;return s.m("GET").h(n).q(r).b(i),s.build()},pt=async(e,t)=>{const s=rb(e,t),n=map({},E,{[b]:e[C]});s.bp("/logout");let r;return s.m("POST").h(n).b(r),s.build()},Re=async(e,t)=>{if(e.statusCode!==200&&e.statusCode>=300)return P(e,t);const s=(0,o.Tj)({$metadata:p(e)}),n=(0,o.Y0)((0,o.Xk)(await I(e.body,t)),"body"),r=(0,o.s)(n,{roleCredentials:o.Ss});return Object.assign(s,r),s},mt=async(e,t)=>{if(e.statusCode!==200&&e.statusCode>=300)return P(e,t);const s=map({$metadata:p(e)}),n=__expectNonNull(__expectObject(await I(e.body,t)),"body"),r=take(n,{nextToken:__expectString,roleList:_json});return Object.assign(s,r),s},yt=async(e,t)=>{if(e.statusCode!==200&&e.statusCode>=300)return P(e,t);const s=map({$metadata:p(e)}),n=__expectNonNull(__expectObject(await I(e.body,t)),"body"),r=take(n,{accountList:_json,nextToken:__expectString});return Object.assign(s,r),s},gt=async(e,t)=>{if(e.statusCode!==200&&e.statusCode>=300)return P(e,t);const s=map({$metadata:p(e)});return await collectBody(e.body,t),s},P=async(e,t)=>{const s={...e,body:await Oe(e.body,t)},n=ke(e,s.body);switch(n){case"InvalidRequestException":case"com.amazonaws.sso#InvalidRequestException":throw await Ee(s,t);case"ResourceNotFoundException":case"com.amazonaws.sso#ResourceNotFoundException":throw await Ce(s,t);case"TooManyRequestsException":case"com.amazonaws.sso#TooManyRequestsException":throw await be(s,t);case"UnauthorizedException":case"com.amazonaws.sso#UnauthorizedException":throw await Ie(s,t);default:const r=s.body;return Pe({output:e,parsedBody:r,errorCode:n})}},Pe=(0,o.jr)(m),Ee=async(e,t)=>{const s=(0,o.Tj)({}),n=e.body,r=(0,o.s)(n,{message:o.lK});Object.assign(s,r);const i=new O({$metadata:p(e),...s});return(0,o.Mw)(i,e.body)},Ce=async(e,t)=>{const s=(0,o.Tj)({}),n=e.body,r=(0,o.s)(n,{message:o.lK});Object.assign(s,r);const i=new k({$metadata:p(e),...s});return(0,o.Mw)(i,e.body)},be=async(e,t)=>{const s=(0,o.Tj)({}),n=e.body,r=(0,o.s)(n,{message:o.lK});Object.assign(s,r);const i=new N({$metadata:p(e),...s});return(0,o.Mw)(i,e.body)},Ie=async(e,t)=>{const s=(0,o.Tj)({}),n=e.body,r=(0,o.s)(n,{message:o.lK});Object.assign(s,r);const i=new z({$metadata:p(e),...s});return(0,o.Mw)(i,e.body)},p=e=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]}),Ae=(e,t)=>(0,o.Px)(e,t).then(s=>t.utf8Encoder(s)),E=e=>e!=null&&e!==""&&(!Object.getOwnPropertyNames(e).includes("length")||e.length!=0)&&(!Object.getOwnPropertyNames(e).includes("size")||e.size!=0),j="accountId",C="accessToken",_="account_id",H="maxResults",M="max_result",G="nextToken",U="next_token",we="roleName",Te="role_name",b="x-amz-sso_bearer_token",I=(e,t)=>Ae(e,t).then(s=>s.length?JSON.parse(s):{}),Oe=async(e,t)=>{const s=await I(e,t);return s.message=s.message??s.Message,s},ke=(e,t)=>{const s=(i,d)=>Object.keys(i).find(F=>F.toLowerCase()===d.toLowerCase()),n=i=>{let d=i;return typeof d=="number"&&(d=d.toString()),d.indexOf(",")>=0&&(d=d.split(",")[0]),d.indexOf(":")>=0&&(d=d.split(":")[0]),d.indexOf("#")>=0&&(d=d.split("#")[1]),d},r=s(e.headers,"x-amzn-errortype");if(r!==void 0)return n(e.headers[r]);if(t.code!==void 0)return n(t.code);if(t.__type!==void 0)return n(t.__type)};class Ne extends o.uB.classBuilder().ep({...ge}).m(function(t,s,n,r){return[(0,me.TM)(n,this.serialize,this.deserialize),(0,$.rD)(n,t.getEndpointParameterInstructions())]}).s("SWBPortalService","GetRoleCredentials",{}).n("SSOClient","GetRoleCredentialsCommand").f(Se,ve).ser(xe).de(Re).build(){}var V=a(3340),ze=a(5904),De=a(42),K=a(9688),v=a(3105),Le=a(5067),A=a(3115),Fe=a(1352),B=a(1741);const $e=async(e,t,s)=>({operation:(0,B.u)(t).operation,region:await(0,B.t)(e.region)()||(()=>{throw new Error("expected `region` to be configured for `aws.auth#sigv4`")})()});function je(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"awsssoportal",region:e.region},propertiesExtractor:(t,s)=>({signingProperties:{config:t,context:s}})}}function w(e){return{schemeId:"smithy.api#noAuth"}}const _e=e=>{const t=[];switch(e.operation){case"GetRoleCredentials":{t.push(w(e));break}case"ListAccountRoles":{t.push(w(e));break}case"ListAccounts":{t.push(w(e));break}case"Logout":{t.push(w(e));break}default:t.push(je(e))}return t},He=e=>({...(0,Fe.h)(e)}),Me={rE:"3.525.0"};var Ge=a(6939),Ue=a(2836),Ve=a(4259),x=a(8967),q=a(5047),Ke=a(6711),Be=a(4753),qe=a(6753),Ze=a(5999),Z=a(8690),J=a(4439),Je=a(2221);const Y="required",c="fn",l="argv",y="ref",W=!0,X="isSet",R="booleanEquals",g="error",S="endpoint",h="tree",D="PartitionResult",L="getAttr",Q={[Y]:!1,type:"String"},ee={[Y]:!0,default:!1,type:"Boolean"},te={[y]:"Endpoint"},se={[c]:R,[l]:[{[y]:"UseFIPS"},!0]},ne={[c]:R,[l]:[{[y]:"UseDualStack"},!0]},u={},oe={[c]:L,[l]:[{[y]:D},"supportsFIPS"]},re={[y]:D},ae={[c]:R,[l]:[!0,{[c]:L,[l]:[re,"supportsDualStack"]}]},ie=[se],de=[ne],ce=[{[y]:"Region"}],Ye={version:"1.0",parameters:{Region:Q,UseDualStack:ee,UseFIPS:ee,Endpoint:Q},rules:[{conditions:[{[c]:X,[l]:[te]}],rules:[{conditions:ie,error:"Invalid Configuration: FIPS and custom endpoint are not supported",type:g},{conditions:de,error:"Invalid Configuration: Dualstack and custom endpoint are not supported",type:g},{endpoint:{url:te,properties:u,headers:u},type:S}],type:h},{conditions:[{[c]:X,[l]:ce}],rules:[{conditions:[{[c]:"aws.partition",[l]:ce,assign:D}],rules:[{conditions:[se,ne],rules:[{conditions:[{[c]:R,[l]:[W,oe]},ae],rules:[{endpoint:{url:"https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",properties:u,headers:u},type:S}],type:h},{error:"FIPS and DualStack are enabled, but this partition does not support one or both",type:g}],type:h},{conditions:ie,rules:[{conditions:[{[c]:R,[l]:[oe,W]}],rules:[{conditions:[{[c]:"stringEquals",[l]:[{[c]:L,[l]:[re,"name"]},"aws-us-gov"]}],endpoint:{url:"https://portal.sso.{Region}.amazonaws.com",properties:u,headers:u},type:S},{endpoint:{url:"https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",properties:u,headers:u},type:S}],type:h},{error:"FIPS is enabled but this partition does not support FIPS",type:g}],type:h},{conditions:de,rules:[{conditions:[ae],rules:[{endpoint:{url:"https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",properties:u,headers:u},type:S}],type:h},{error:"DualStack is enabled but this partition does not support DualStack",type:g}],type:h},{endpoint:{url:"https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",properties:u,headers:u},type:S}],type:h}],type:h},{error:"Invalid Configuration: Missing Region",type:g}]},We=(e,t={})=>(0,Je.sO)(Ye,{endpointParams:e,logger:t.logger}),Xe=e=>({apiVersion:"2019-06-10",base64Decoder:e?.base64Decoder??Z.E,base64Encoder:e?.base64Encoder??Z.n,disableHostPrefix:e?.disableHostPrefix??!1,endpointProvider:e?.endpointProvider??We,extensions:e?.extensions??[],httpAuthSchemeProvider:e?.httpAuthSchemeProvider??_e,httpAuthSchemes:e?.httpAuthSchemes??[{schemeId:"aws.auth#sigv4",identityProvider:t=>t.getIdentityProvider("aws.auth#sigv4"),signer:new qe.f},{schemeId:"smithy.api#noAuth",identityProvider:t=>t.getIdentityProvider("smithy.api#noAuth")||(async()=>({})),signer:new f.mR}],logger:e?.logger??new o.N4,serviceId:e?.serviceId??"SSO",urlParser:e?.urlParser??Ze.D,utf8Decoder:e?.utf8Decoder??J.ar,utf8Encoder:e?.utf8Encoder??J.Pq});var Qe=a(8323);const et=e=>{(0,o.I9)(process.version);const t=(0,Qe.I)(e),s=()=>t().then(o.lT),n=Xe(e);return(0,Ge.I)(process.version),{...n,...e,runtime:"node",defaultsMode:t,bodyLengthChecker:e?.bodyLengthChecker??Ke.n,defaultUserAgentProvider:e?.defaultUserAgentProvider??(0,Ue.mJ)({serviceId:n.serviceId,clientVersion:Me.rE}),maxAttempts:e?.maxAttempts??(0,x.Z)(A.qs),region:e?.region??(0,x.Z)(v.GG,v.zH),requestHandler:q.$c.create(e?.requestHandler??s),retryMode:e?.retryMode??(0,x.Z)({...A.kN,default:async()=>(await s()).retryMode||Be.L0}),sha256:e?.sha256??Ve.V.bind(null,"sha256"),streamCollector:e?.streamCollector??q.kv,useDualstackEndpoint:e?.useDualstackEndpoint??(0,x.Z)(v.e$),useFipsEndpoint:e?.useFipsEndpoint??(0,x.Z)(v.Ko)}};var le=a(765),ue=a(9113);const tt=e=>{const t=e.httpAuthSchemes;let s=e.httpAuthSchemeProvider,n=e.credentials;return{setHttpAuthScheme(r){const i=t.findIndex(d=>d.schemeId===r.schemeId);i===-1?t.push(r):t.splice(i,1,r)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(r){s=r},httpAuthSchemeProvider(){return s},setCredentials(r){n=r},credentials(){return n}}},st=e=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()}),T=e=>e,nt=(e,t)=>{const s={...T((0,le.Rq)(e)),...T((0,o.xA)(e)),...T((0,ue.eS)(e)),...T(tt(e))};return t.forEach(n=>n.configure(s)),{...e,...(0,le.$3)(s),...(0,o.uv)(s),...(0,ue.jt)(s),...st(s)}};class ot extends o.Kj{constructor(...[t]){const s=et(t||{}),n=ye(s),r=(0,v.TD)(n),i=(0,$.Co)(r),d=(0,A.$z)(i),F=(0,V.OV)(d),rt=(0,K.Dc)(F),at=He(rt),he=nt(at,t?.extensions||[]);super(he),this.config=he,this.middlewareStack.use((0,A.ey)(this.config)),this.middlewareStack.use((0,Le.vK)(this.config)),this.middlewareStack.use((0,V.TC)(this.config)),this.middlewareStack.use((0,ze.Y7)(this.config)),this.middlewareStack.use((0,De.n4)(this.config)),this.middlewareStack.use((0,K.sM)(this.config)),this.middlewareStack.use((0,f.wB)(this.config,{httpAuthSchemeParametersProvider:this.getDefaultHttpAuthSchemeParametersProvider(),identityProviderConfigProvider:this.getIdentityProviderConfigProvider()})),this.middlewareStack.use((0,f.lW)(this.config))}destroy(){super.destroy()}getDefaultHttpAuthSchemeParametersProvider(){return $e}getIdentityProviderConfigProvider(){return async t=>new f.h$({"aws.auth#sigv4":t.credentials})}}}};

//# sourceMappingURL=532.js.map