"use strict";exports.id=584,exports.ids=[584],exports.modules={9584:(z,R,a)=>{a.d(R,{fromSSO:()=>M});var t=a(6034),d=a(7652);const N=s=>s&&(typeof s.sso_start_url=="string"||typeof s.sso_account_id=="string"||typeof s.sso_session=="string"||typeof s.sso_region=="string"||typeof s.sso_role_name=="string"),_=5*60*1e3,x="To refresh this SSO session run 'aws sso login' with the corresponding profile.",I={},E=async s=>{const{SSOOIDCClient:n}=await a.e(22).then(a.bind(a,9022));if(I[s])return I[s];const e=new n({region:s});return I[s]=e,e},J=async(s,n)=>{const{CreateTokenCommand:e}=await a.e(22).then(a.bind(a,9022));return(await E(n)).send(new e({clientId:s.clientId,clientSecret:s.clientSecret,refreshToken:s.refreshToken,grantType:"refresh_token"}))},$=s=>{if(s.expiration&&s.expiration.getTime()<Date.now())throw new t.Jh(`Token is expired. ${x}`,!1)},w=(s,n,e=!1)=>{if(typeof n>"u")throw new t.Jh(`Value not present for '${s}' in SSO Token${e?". Cannot refresh":""}. ${x}`,!1)};var P=a(9896);const{writeFile:U}=P.promises,F=(s,n)=>{const e=(0,d.C9)(s),i=JSON.stringify(n,null,2);return U(e,i)},D=new Date(0),H=(s={})=>async()=>{s.logger?.debug("@aws-sdk/token-providers","fromSso");const n=await(0,d.YU)(s),e=(0,d.Bz)(s),i=n[e];if(i){if(!i.sso_session)throw new t.Jh(`Profile '${e}' is missing required property 'sso_session'.`)}else throw new t.Jh(`Profile '${e}' could not be found in shared credentials file.`,!1);const c=i.sso_session,l=(await(0,d.qw)(s))[c];if(!l)throw new t.Jh(`Sso session '${c}' could not be found in shared credentials file.`,!1);for(const r of["sso_start_url","sso_region"])if(!l[r])throw new t.Jh(`Sso session '${c}' is missing required property '${r}'.`,!1);const S=l.sso_start_url,h=l.sso_region;let o;try{o=await(0,d.vf)(c)}catch{throw new t.Jh(`The SSO session token associated with profile=${e} was not found or is invalid. ${x}`,!1)}w("accessToken",o.accessToken),w("expiresAt",o.expiresAt);const{accessToken:C,expiresAt:O}=o,f={token:C,expiration:new Date(O)};if(f.expiration.getTime()-Date.now()>_)return f;if(Date.now()-D.getTime()<30*1e3)return $(f),f;w("clientId",o.clientId,!0),w("clientSecret",o.clientSecret,!0),w("refreshToken",o.refreshToken,!0);try{D.setTime(Date.now());const r=await J(o,h);w("accessToken",r.accessToken),w("expiresIn",r.expiresIn);const g=new Date(Date.now()+r.expiresIn*1e3);try{await F(c,{...o,accessToken:r.accessToken,expiresAt:g.toISOString(),refreshToken:r.refreshToken})}catch{}return{token:r.accessToken,expiration:g}}catch{return $(f),f}},m=!1,v=async({ssoStartUrl:s,ssoSession:n,ssoAccountId:e,ssoRegion:i,ssoRoleName:c,ssoClient:T,clientConfig:l,profile:S})=>{let h;const o="To refresh this SSO session run aws sso login with the corresponding profile.";if(n)try{const p=await H({profile:S})();h={accessToken:p.token,expiresAt:new Date(p.expiration).toISOString()}}catch(p){throw new t.C1(p.message,m)}else try{h=await(0,d.vf)(s)}catch{throw new t.C1(`The SSO session associated with this profile is invalid. ${o}`,m)}if(new Date(h.expiresAt).getTime()-Date.now()<=0)throw new t.C1(`The SSO session associated with this profile has expired. ${o}`,m);const{accessToken:C}=h,{SSOClient:O,GetRoleCredentialsCommand:f}=await a.e(532).then(a.bind(a,5532)),r=T||new O(Object.assign({},l??{},{region:l?.region??i}));let g;try{g=await r.send(new f({accountId:e,roleName:c,accessToken:C}))}catch(p){throw t.C1.from(p,m)}const{roleCredentials:{accessKeyId:k,secretAccessKey:u,sessionToken:y,expiration:A,credentialScope:j}={}}=g;if(!k||!u||!y||!A)throw new t.C1("SSO returns an invalid temporary credential.",m);return{accessKeyId:k,secretAccessKey:u,sessionToken:y,expiration:new Date(A),credentialScope:j}},K=s=>{const{sso_start_url:n,sso_account_id:e,sso_region:i,sso_role_name:c}=s;if(!n||!e||!i||!c)throw new t.C1(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(s).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`,!1);return s},M=(s={})=>async()=>{s.logger?.debug("@aws-sdk/credential-provider-sso","fromSSO");const{ssoStartUrl:n,ssoAccountId:e,ssoRegion:i,ssoRoleName:c,ssoSession:T}=s,{ssoClient:l}=s,S=(0,d.Bz)(s);if(!n&&!e&&!i&&!c&&!T){const o=(await(0,d.YU)(s))[S];if(!o)throw new t.C1(`Profile ${S} was not found.`);if(!N(o))throw new t.C1(`Profile ${S} is not configured with SSO credentials.`);if(o?.sso_session){const u=(await(0,d.qw)(s))[o.sso_session],y=` configurations in profile ${S} and sso-session ${o.sso_session}`;if(i&&i!==u.sso_region)throw new t.C1("Conflicting SSO region"+y,!1);if(n&&n!==u.sso_start_url)throw new t.C1("Conflicting SSO start_url"+y,!1);o.sso_region=u.sso_region,o.sso_start_url=u.sso_start_url}const{sso_start_url:C,sso_account_id:O,sso_region:f,sso_role_name:r,sso_session:g}=K(o);return v({ssoStartUrl:C,ssoSession:g,ssoAccountId:O,ssoRegion:f,ssoRoleName:r,ssoClient:l,clientConfig:s.clientConfig,profile:S})}else{if(!n||!e||!i||!c)throw new t.C1('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"');return v({ssoStartUrl:n,ssoSession:T,ssoAccountId:e,ssoRegion:i,ssoRoleName:c,ssoClient:l,clientConfig:s.clientConfig,profile:S})}}}};

//# sourceMappingURL=584.js.map