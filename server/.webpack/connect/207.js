"use strict";exports.id=207,exports.ids=[207],exports.modules={3207:(K,A,r)=>{r.d(A,{fromHttp:()=>g});var h=r(5047),a=r(6034),C=r(1943),l=r.n(C);const H="127.0.0.0/8",P="::1/128",I="169.254.170.2",E="169.254.170.23",p="[fd00:ec2::23]",N=e=>{if(e.protocol!=="https:"&&!(e.hostname===I||e.hostname===E||e.hostname===p)){if(e.hostname.includes("[")){if(e.hostname==="[::1]"||e.hostname==="[0000:0000:0000:0000:0000:0000:0000:0001]")return}else{if(e.hostname==="localhost")return;const n=e.hostname.split("."),s=o=>{const t=parseInt(o,10);return 0<=t&&t<=255};if(n[0]==="127"&&s(n[1])&&s(n[2])&&s(n[3])&&n.length===4)return}throw new a.C1(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`)}};var u=r(9113),m=r(112),R=r(8572);function S(e){return new u.Kd({protocol:e.protocol,hostname:e.hostname,port:Number(e.port),path:e.pathname,query:Array.from(e.searchParams.entries()).reduce((n,[s,o])=>(n[s]=o,n),{}),fragment:e.hash})}async function f(e){const n=e?.headers["content-type"]??e?.headers["Content-Type"]??"";n.includes("json")||console.warn("HTTP credential provider response header content-type was not application/json. Observed: "+n+".");const o=await(0,R.c9)(e.body).transformToString();if(e.statusCode===200){const t=JSON.parse(o);if(typeof t.AccessKeyId!="string"||typeof t.SecretAccessKey!="string"||typeof t.Token!="string"||typeof t.Expiration!="string")throw new a.C1("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }");return{accessKeyId:t.AccessKeyId,secretAccessKey:t.SecretAccessKey,sessionToken:t.Token,expiration:(0,m.EI)(t.Expiration)}}if(e.statusCode>=400&&e.statusCode<500){let t={};try{t=JSON.parse(o)}catch{}throw Object.assign(new a.C1(`Server responded with status: ${e.statusCode}`),{Code:t.Code,Message:t.Message})}throw new a.C1(`Server responded with status: ${e.statusCode}`)}const w=(e,n,s)=>async()=>{for(let o=0;o<n;++o)try{return await e()}catch{await new Promise(i=>setTimeout(i,s))}return await e()},O="AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",_="http://169.254.170.2",v="AWS_CONTAINER_CREDENTIALS_FULL_URI",y="AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",L="AWS_CONTAINER_AUTHORIZATION_TOKEN",g=e=>{e.logger?.debug("@aws-sdk/credential-provider-http","fromHttp");let n;const s=e.awsContainerCredentialsRelativeUri??process.env[O],o=e.awsContainerCredentialsFullUri??process.env[v],t=e.awsContainerAuthorizationToken??process.env[L],i=e.awsContainerAuthorizationTokenFile??process.env[y];if(s&&o&&(console.warn("AWS SDK HTTP credentials provider:","you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."),console.warn("awsContainerCredentialsFullUri will take precedence.")),t&&i&&(console.warn("AWS SDK HTTP credentials provider:","you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."),console.warn("awsContainerAuthorizationToken will take precedence.")),o)n=o;else if(s)n=`${_}${s}`;else throw new a.C1(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`);const T=new URL(n);N(T);const U=new h.$c({requestTimeout:e.timeout??1e3,connectionTimeout:e.timeout??1e3});return w(async()=>{const c=S(T);t?c.headers.Authorization=t:i&&(c.headers.Authorization=(await l().readFile(i)).toString());try{const d=await U.handle(c);return f(d.response)}catch(d){throw new a.C1(String(d))}},e.maxRetries??3,e.timeout??1e3)}}};

//# sourceMappingURL=207.js.map