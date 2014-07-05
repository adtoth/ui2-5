
VBI.NodeProperty=function(d,n,p,c){var a=null;if(!(a=d[n]))a=d[n+".bind"];this.m_NPath=a.split(".");this.m_Path=a.split(".");this.m_PNP=p;this.m_nCurElement=0;this.m_CurElement=null;this.m_DTN=c.m_DataTypeProvider.FindTypeNodeFromPath(this.m_Path);var t=this;while(t=t.m_PNP){if(c.m_DataTypeProvider.isParentOf(t.m_DTN,this.m_DTN)){var b,e=t.m_DTN.GetPath();for(b=0;b<e.length;++b){if(this.m_NPath[0]==e[b])this.m_NPath.splice(0,1);else break}break}}this.m_PNP=t;this.NotifyDataChange=function(c){this.m_CurElement=null;this.m_DTN=c.m_DataTypeProvider.FindTypeNodeFromPath(this.m_Path)};this.clear=function(){this.m_PNP=null;this.m_CurElement=null;this.m_DTN=null;this.m_NPath=null;this.m_Path=null};this.GetCurrentElement=function(c){if(this.m_CurElement)return this.m_CurElement;var f=this.GetCurrentNode(c);if(!f)return null;return(this.m_CurElement=f.m_dataelements[this.m_nCurElement])};this.GetIndexedElement=function(c,i){var f=this.GetCurrentNode(c);if(!f)return null;return f.m_dataelements[i]};this.GetCurrentNode=function(c){var f;if(this.m_PNP){var g=this.m_PNP.GetCurrentElement(c);f=g.FindNodeFromPathArray(this.m_NPath)}else{f=c.m_DataProvider.FindNodeFromPath(this.m_NPath)}return f};this.Select=function(i){this.m_CurElement=null;this.m_nCurElement=i};this.IsSelected=function(c){return false};this.SetSelected=function(c,s){return};return this};
VBI.AttributeProperty=function(d,n,p,c){var v;if(v=d[n]){this.m_Name=n;this.m_Value=v}else if(v=d[n+".bind"]){this.m_PNP=p;this.m_Name=n;this.m_RelBind=v.split(".");this.m_AbsBind=v.split(".");this.m_DTA=c.m_DataTypeProvider.FindTypeAttributeFromPath(this.m_AbsBind);var t=this;while(t=t.m_PNP){if(c.m_DataTypeProvider.isParentOf(t.m_DTN,this.m_DTA)){var a,b=t.m_DTN.GetPath();for(a=0;a<b.length;++a){if(this.m_RelBind[0]==b[a])this.m_RelBind.splice(0,1);else break}break}}this.m_PNP=t}this.NotifyDataChange=function(c){if(this.m_AbsBind)this.m_DTA=c.m_DataTypeProvider.FindTypeAttributeFromPath(this.m_AbsBind)};this.clear=function(){this.m_PNP=null;this.m_DTA=null};this.GetAttributeObject=function(c){if(this.m_RelBind){if(this.m_PNP)return this.m_PNP.GetCurrentElement(c).FindAttributeFromPathArray(this.m_RelBind);else c.m_DataProvider.FindTypeAttributeFromPath(this.m_RelBind)}return null};this.GetValueFloat=function(c){if(this.m_Value)return VBI.Types.string2float(this.m_Value);if(this.m_RelBind){var e=this.GetAttributeObject(c);{if(e.m_dta.m_Type==VBI.Types.st_float)return e.m_Value;if(e.m_dta.m_Type==VBI.Types.st_string)return VBI.Types.string2float(e.m_Value);if(e.m_dta.m_Type==VBI.Types.st_long)return VBI.Types.long2float(e.m_Value)}};return null};this.GetValueString=function(c){if(this.m_Value)return this.m_Value;if(this.m_RelBind){var e;if(e=this.GetAttributeObject(c)){if(e.m_dta.m_Type==VBI.Types.st_string)return e.m_Value;else return e.GetStringValue()}};return null};this.GetValueLong=function(c){if(this.m_Value)VBI.Types.string2long(this.m_Value);if(this.m_RelBind){var e;if(e=this.GetAttributeObject(c)){if(e.m_dta.m_Type==VBI.Types.st_long)return e.m_Value;if(e.m_dta.m_Type==VBI.Types.st_string)return VBI.Types.string2long(e.m_Value);if(e.m_dta.m_Type==VBI.Types.st_float)return VBI.Types.float2long(e.m_Value)}};return null};this.GetValueBool=function(c){if(this.m_Value)return VBI.Types.string2bool(this.m_Value);if(this.m_RelBind){var e;if(e=this.GetAttributeObject(c)){if(e.m_dta.m_Type==VBI.Types.st_bool)return e.m_Value;if(e.m_dta.m_Type==VBI.Types.st_string)return VBI.Types.string2bool(e.m_Value)}};return false};this.GetValueVector=function(c){if(this.m_Value)return VBI.Types.string2vector(this.m_Value);if(this.m_RelBind){var e;if(e=this.GetAttributeObject(c)){if((e.m_dta.m_Type==VBI.Types.st_vector)||(e.m_dta.m_Type==VBI.Types.st_vectorarray))return e.m_Value;if(e.m_dta.m_Type==VBI.Types.st_string)return VBI.Types.string2vector(e.m_Value)}}return null};this.GetValueColor=function(c){if(this.m_Value)return VBI.Types.string2color(this.m_Value);if(this.m_RelBind){var e;if(e=this.GetAttributeObject(c)){if((e.m_dta.m_Type==VBI.Types.st_color))return e.m_Value;if(e.m_dta.m_Type==VBI.Types.st_string)return VBI.Types.string2color(e.m_Value)}}return null};this.IsBound=function(){return this.m_RelBind?true:false};return this};
VBI.VisualObjects=function(){var v={};v.vbiclass="VisualObjects";v.Factory={"{00100000-2012-0004-B001-64592B8DB964}":function(){return new VBI.VisualObjects.Spot()},"{00100000-2012-0004-B001-64592B8DB965}":function(){return new VBI.VisualObjects.Link()},"{00100000-2012-0004-B001-C46BD7336A1A}":function(){return new VBI.VisualObjects.Route()},"{00100000-2013-0004-B001-7EB3CCC039C4}":function(){return new VBI.VisualObjects.Circle()},"{00100000-2013-0004-B001-686F01B57873}":function(){return new VBI.VisualObjects.CircleDist()},"{00100000-2012-0004-B001-383477EA1DEB}":function(){return new VBI.VisualObjects.Pie()},"{00100000-2012-0004-B001-BFED458C3076}":function(){return new VBI.VisualObjects.Box()},"{00100000-2012-0004-B001-F311DE491C77}":function(){return new VBI.VisualObjects.Dummy()},};v.Factory.CreateInstance=function(c){return v.Factory[c]()};VBI.VisualObjects.Base={m_Props:null,m_Scene:null,m_BB:[],m_nHotItem:-1,m_nSelectedItem:-1,HitTestBoundingBox:function(x){var t,h=[];for(var n=this.m_BB.length-1;n>=0;--n){if(t=this.m_BB[n])if(VBI.Utilities.PtInRect(x,t))h.push(n)}return h},clear:function(){if(this.m_Props){for(var n=0;n<this.m_Props.length;++n)this.m_Props[n].clear();this.m_Props=null}this.m_Scene=null},load:function(i,d,c){if(d.id)i.m_ID=d.id},RenderDummyInstance:function(n,c,d,p){var s=c.m_Scene;var x=s.GetPointFromPos(p);var r=10;d.beginPath();d.arc(x[0],x[1],r,0,2*Math.PI,false);d.fillStyle='red';d.fill();d.lineWidth=5;d.strokeStyle='#003300';d.stroke();return},Render:function(c,d){},NotifyDataChange:function(c){if(this.m_Props){for(var n=0;n<this.m_Props.length;++n)this.m_Props[n].NotifyDataChange(c)}}};VBI.VisualObjects.Spot=function(){this.load=function(d,c){Object.getPrototypeOf(this).load(this,d,c);this.m_Props=[];this.m_Props.push(this.m_DataSource=new VBI.NodeProperty(d,'datasource',null,c));this.m_Props.push(this.m_Pos=new VBI.AttributeProperty(d,'pos',this.m_DataSource,c));this.m_Props.push(this.m_Image=new VBI.AttributeProperty(d,'image',this.m_DataSource,c));this.m_Props.push(this.m_Icon=new VBI.AttributeProperty(d,'icon',this.m_DataSource,c));this.m_Props.push(this.m_Tooltip=new VBI.AttributeProperty(d,'tooltip',this.m_DataSource,c))};this.HitTest=function(n,a,x,z,c){this.m_DataSource.Select(n);var i=null;var b=this.m_Image.GetValueString(c);var d=0;i=c.GetResources().GetImageBits(b);if(i){var e=i[0];var f=null;if(this.m_nHotItem==n)f=[Math.round((x[0]-this.m_BB[n][a][0])*z[0]/1.2),Math.round((x[1]-this.m_BB[n][a][1])*z[1]/1.2)];else f=[Math.round((x[0]-this.m_BB[n][a][0])*z[0]),Math.round((x[1]-this.m_BB[n][a][1])*z[1])];d=e[f[1]*i[1]*4+(f[0]*4)+3]}return d};this.GetHitArray=function(x,y){var h=[];var z=this.m_Scene.GetCurrentZoomFactors();var a=[x/z[0],y/z[1]];var t,b=0;for(var n=this.m_BB.length-1;n>=0&&b<255;--n){for(var c=0;c<this.m_BB[n].length;c++)if(t=this.m_BB[n][c]){if(VBI.Utilities.PtInRect(a,t)){b=this.HitTest(n,c,a,z,this.m_Scene.m_Ctx);if(b>0)h.push(n)}}}return h};this.RenderInstance=function(n,c,d,p,a){VBI.m_bTrace&&VBI.Trace("Spot: RenderInstance");if(!a)return;var s=c.m_Scene;var x=s.GetPointsFromPos(p,false);this.m_BB[n]=[];for(var i=0;i<x.length;i++){xyz=x[i];if(xyz.m_bVisible){var z=s.GetCurrentZoomFactors();var l,t;var w=a.naturalWidth/z[0];var h=a.naturalHeight/z[1];if(this.m_nHotItem==n){w=Math.round(w*1.2);h=Math.round(h*1.2)}d.drawImage(a,l=xyz[0]-w/2,t=xyz[1]-h,w,h);this.m_BB[n].push([l,t,l+w,t+h])}}};this.Render=function(c,d){Object.getPrototypeOf(this).m_BB.length=0;var s=c.m_Scene;var a=s.m_Ctx;var n;if(n=this.m_DataSource.GetCurrentNode(a)){this.m_BB=[];for(var b=0;b<n.m_dataelements.length;++b){this.m_DataSource.Select(b);var l=this.m_Pos.GetValueVector(a);var i=this.m_Image.GetValueString(a);var e=a.GetResources().GetImage(i,s.RenderAsync.bind(s));this.RenderInstance(b,c,d,l,e)}}else{}};this.onmouseout=function(e){};this.oncontextmenu=function(e){var h=this.GetHitArray(e.offsetX,e.offsetY);if(h.length>0){var a;if(a=this.m_Scene.m_Ctx.m_Actions){var b;if(b=a.findAction("ContextMenu",this.m_Scene,this))this.m_Scene.m_Ctx.FireAction(b,this.m_Scene,this,this.m_DataSource.GetIndexedElement(this.m_Scene.m_Ctx,h[0]),this.m_Scene.GetEventVPCoordsObj(e));e.preventDefault()}}return h.length>0?true:false};this.onmousemove=function(e){var h=this.GetHitArray(e.offsetX,e.offsetY);if(h.length>0){this.m_Scene.RenderAsync();this.m_nHotItem=h[0];this.m_DataSource.Select(h[0]);this.m_Scene.SetToolTip(this.m_Tooltip.GetValueString(this.m_Scene.m_Ctx))}else if(this.m_nHotItem>-1){this.m_Scene.RenderAsync();this.m_nHotItem=-1}return h.length>0?true:false};this.onclick=function(e){var h=this.GetHitArray(e.offsetX,e.offsetY);if(h.length>0){this.m_Scene.RenderAsync();this.m_nSelectedItem=(this.m_nSelectedItem==h[0])?-1:h[0];var a;if(a=this.m_DataSource.GetIndexedElement(this.m_Scene.m_Ctx,h[0]))a.Select(true);var b;if(b=this.m_Scene.m_Ctx.m_Actions){var c;if(c=b.findAction("Click",this.m_Scene,this))this.m_Scene.m_Ctx.FireAction(c,this.m_Scene,this,a,this.m_Scene.GetEventVPCoordsObj(e))}}return h.length>0?true:false};this.ontouchend=function(e){return this.onclick(e)}};VBI.VisualObjects.Spot.prototype=VBI.VisualObjects.Base;VBI.VisualObjects.Link=function(){this.load=function(d,c){Object.getPrototypeOf(this).load(this,d,c)}};VBI.VisualObjects.Link.prototype=VBI.VisualObjects.Base;VBI.VisualObjects.Route=function(){this.m_LP=[];this.load=function(d,c){Object.getPrototypeOf(this).load(this,d,c);this.m_Props=[];this.m_Props.push(this.m_DataSource=new VBI.NodeProperty(d,'datasource',null,c));this.m_Props.push(this.m_PosArray=new VBI.AttributeProperty(d,'posarray',this.m_DataSource,c));this.m_Props.push(this.m_Scale=new VBI.AttributeProperty(d,'scale',this.m_DataSource,c));this.m_Props.push(this.m_FxDir=new VBI.AttributeProperty(d,'fxdir',this.m_DataSource,c));this.m_Props.push(this.m_FxSize=new VBI.AttributeProperty(d,'fxsize',this.m_DataSource,c));this.m_Props.push(this.m_Color=new VBI.AttributeProperty(d,'color',this.m_DataSource,c));this.m_Props.push(this.m_Start=new VBI.AttributeProperty(d,'start',this.m_DataSource,c));this.m_Props.push(this.m_End=new VBI.AttributeProperty(d,'end',this.m_DataSource,c));this.m_Props.push(this.m_Tooltip=new VBI.AttributeProperty(d,'tooltip',this.m_DataSource,c));this.m_LineWidth=6};this.DrawArrow=function(c,a,b,o){if(o==undefined)o=0;if(a.length<3)return;c.beginPath();c.moveTo(a[0][0]+o,a[0][1]);c.lineTo(a[1][0]+o,a[1][1]);c.lineTo(a[2][0]+o,a[2][1]);c.lineTo(a[0][0]+o,a[0][1]);c.fillStyle=b;c.fill()};this.CalcArrow=function(s,p,a,r,b,n,c){var d=p.length/3;var e=2*a*a;var f,g;var h,t,x=[0,0,0];var F=false;g=r?d-1:0;t=h=s.GetPointFromPos([p[g*3],p[g*3+1],0.0],true,c,c!=undefined);var i;var y;for(f=1;f<d;++f){g=r?d-1-f:f;x=s.GetPointFromPos([p[g*3],p[g*3+1],0.0],true,t,true);y=t[1]-x[1];i=t[0]-x[0];if(Math.abs(i)>n){x[0]+=(t[0]>x[0]?2:-2)*n;i=t[0]-x[0]}if((i*i+y*y)>e){F=true;break}}if(!F)return false;var j=x[0]-h[0];var k=x[1]-h[1];var l=Math.sqrt(j*j+k*k);j=j/l*a;k=k/l*a;var m=h[0]+j;var o=h[1]+k;b.idx=r?d-f-1:f;b.ta=[[h[0],h[1]],[m+k,o-j],[m-k,o+j]];b.pt=[m,o];b.pt.m_bVisible=x.m_bVisible;return true};this.RenderInstance=function(n,c,d,p,a,s,e,l){var b=c.m_Scene;var f=l*l/2;var g=(b.m_nWidthCanvas/b.m_nTilesX)*(1<<b.m_Canvas[0].m_nCurrentLOD);var h=g/2;if(!p)return;var k=p.length/3;if(k<2)return;var m=1;var o=k-1;var r={};if(s&&this.CalcArrow(b,p,l+5,false,r,h)){m=r.idx}var q=r.pt?[r.pt[0],r.pt[1]]:b.GetPointFromPos([p[0],p[1],0.0],true);var t=q;t.m_nIndex=0;var u=[t];var w,x;var y=q[0];var z=b.m_nWidthCanvas-q[0];lastX=x=q[0];for(var A=m;A<=o;A++){var B=b.GetPointFromPos([p[A*3],p[A*3+1],0.0],true,t,true);w=B[0];y=Math.max(y,w);z=Math.max(z,b.m_nWidthCanvas-w);if(((x-w)*(x-w)+(t[1]-B[1])*(t[1]-B[1]))>=f){B.m_nIndex=A;u.push(B);x=w}t=B}var C={};if(e&&this.CalcArrow(b,p,l+5,true,C,h,t)){while((u.length>0)&&(u[u.length-1].m_nIndex>C.idx))u.pop();u.push([C.pt[0],C.pt[1]])}d.strokeStyle=a;d.lineWidth=l;d.lineCap='round';this.m_BB[n]=[];for(var i=-Math.floor(y/g);i<=Math.floor(z/g);i++){var L=[];nOff=i*g;if(r.ta!=undefined){this.DrawArrow(d,r.ta,a,nOff);L.m_RS=[[r.ta[0][0]+nOff,r.ta[0][1]],[r.ta[1][0]+nOff,r.ta[1][1]],[r.ta[2][0]+nOff,r.ta[2][1]]]}d.beginPath();d.moveTo(q[0]+nOff,q[1]);L.push([q[0]+nOff,q[1]]);for(var j=1;j<u.length;j++){d.lineTo(u[j][0]+nOff,u[j][1]);L.push([u[j][0]+nOff,u[j][1]])}d.stroke();if(C.ta!=undefined){this.DrawArrow(d,C.ta,a,nOff);L.m_RE=[[C.ta[0][0]+nOff,C.ta[0][1]],[C.ta[1][0]+nOff,C.ta[1][1]],[C.ta[2][0]+nOff,C.ta[2][1]]]}this.m_LP[n].push(L);var D=[Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE];VBI.Utilities.updateBoundRect(L,D);VBI.Utilities.inflateRect(D,l/2);VBI.Utilities.updateBoundRect(D,l/2);if(L.m_RS)VBI.Utilities.updateBoundRect(L.m_RS,D);if(L.m_RE)VBI.Utilities.updateBoundRect(L.m_RE,D);D.m_nIndex=n;this.m_BB[n].push(D);if(VBI.m_bTrace)VBI.Utilities.DrawFrameRect(d,"red",D)}};this.Render=function(c,d){Object.getPrototypeOf(this).m_BB.length=0;var s=c.m_Scene;var n;if(n=this.m_DataSource.GetCurrentNode(s.m_Ctx)){this.m_BB=[];this.m_LP=[];for(var a=0;a<n.m_dataelements.length;++a){this.m_DataSource.Select(a);this.m_LP[a]=[];var p=this.m_PosArray.GetValueVector(s.m_Ctx);var b=this.m_Color.GetValueColor(s.m_Ctx);if(a==this.m_nHotItem)b='#f0ab00';var e=this.m_Start.GetValueLong(s.m_Ctx);var f=this.m_End.GetValueLong(s.m_Ctx);this.RenderInstance(a,c,d,p,b,e,f,this.m_LineWidth)}}else{}};this.HitTest=function(n,a,p){var x=p[0],y=p[1],b,c,d,e;var l=this.m_LineWidth/2;var s=l*l;var L=this.m_LP[n][a];b=L[0][0];c=L[0][1];var f=L.length;for(var g=1;g<f;++g){d=L[g][0];e=L[g][1];if(!((x<(Math.min(b,d)-l))||(x>(Math.max(b,d)+l))||(y<(Math.min(c,e)-l))||(y>(Math.max(c,e)+l)))&&(s>VBI.Utilities.sqDistance(b,c,d,e,x,y))){VBI.m_bTrace&&VBI.Trace("VBI.VisualObjects.Route hit line"+n);return true}b=d;c=e}if(L.m_RS&&VBI.Utilities.pointInTriangle2(L.m_RS,p))return true;return(L.m_RE&&VBI.Utilities.pointInTriangle2(L.m_RE,p))};this.onclick=function(e){var a=0;var h=[];var s=e.m_Scene;var z=s.GetCurrentZoomFactors();var x=[e.offsetX/z[0],e.offsetY/z[1]];for(var n=this.m_BB.length-1;n>=0&&a<255;--n){for(var b=0;b<this.m_BB[n].length;++b)if(tmp=this.m_BB[n][b]){if(VBI.Utilities.PtInRect(x,tmp)){a=this.HitTest(n,x);if(a>0){h.push(n)}}}}if(h.length>0){s.RenderAsync();this.m_nSelectedItem=(this.m_nSelectedItem==h[0])?-1:h[0];var c=s.m_Ctx.m_Actions;if(c){var d;if(d=c.findAction("Click",s,this)){var f=null;var g=this.m_DataSource.GetCurrentNode(s.m_Ctx);if(g){f=g.FindElementByIndex(h[0]);f.Select(true)}if(s.m_Ctx)s.m_Ctx.FireAction(d,s,this,f,this.m_Scene.GetEventVPCoordsObj(e))}}}};this.ontouchend=function(e){var a=0;var h=[];var s=e.m_Scene;var z=s.GetCurrentZoomFactors();var x=[e.offsetX/z[0],e.offsetY/z[1]];for(var n=this.m_BB.length-1;n>=0&&a<255;--n){for(var b=0;b<this.m_BB[n].length;++b)if(tmp=this.m_BB[n][b]){if(VBI.Utilities.PtInRect(x,tmp)){a=this.HitTest(n,x);if(a>0)h.push(n)}}}if(h.length>0){s.RenderAsync();this.m_nHotItem=h[0];this.m_nSelectedItem=(this.m_nSelectedItem==h[0])?-1:h[0];var c=s.m_Ctx.m_Actions;if(c){var d;if(d=c.findAction("Click",s,this)){var f=null;var g=this.m_DataSource.GetCurrentNode(s.m_Ctx);if(g){f=g.FindElementByIndex(h[0]);f.Select(true)}if(s.m_Ctx)s.m_Ctx.FireAction(d,s,this,f,this.m_Scene.GetEventVPCoordsObj(e))}}}};this.onmousemove=function(e){var h=[];var s=e.m_Scene;var z=s.GetCurrentZoomFactors();var x=[e.offsetX/z[0],e.offsetY/z[1]];for(var n=this.m_BB.length-1;n>=0;--n){for(var a=0;a<this.m_BB[n].length;++a)if((tmp=this.m_BB[n][a])&&VBI.Utilities.PtInRect(x,tmp)){if(this.HitTest(n,a,x))h.push(n)}}if(h.length>0){s.RenderAsync();this.m_nHotItem=h[0];this.m_DataSource.Select(h[0]);s.SetToolTip(this.m_Tooltip.GetValueString(s.m_Ctx))}else if(this.m_nHotItem>-1){e.m_Scene.RenderAsync();this.m_nHotItem=-1}return h.length>0?true:false}};VBI.VisualObjects.Route.prototype=VBI.VisualObjects.Base;VBI.VisualObjects.Circle=function(){this.load=function(d,c){Object.getPrototypeOf(this).load(this,d,c);this.m_Props=[];this.m_Props.push(this.m_DataSource=new VBI.NodeProperty(d,'datasource',null,c));this.m_Props.push(this.m_Pos=new VBI.AttributeProperty(d,'pos',this.m_DataSource,c));this.m_Props.push(this.m_ColorBorder=new VBI.AttributeProperty(d,'colorBorder',this.m_DataSource,c));this.m_Props.push(this.m_Radius=new VBI.AttributeProperty(d,'radius',this.m_DataSource,c));this.m_Props.push(this.m_Tooltip=new VBI.AttributeProperty(d,'tooltip',this.m_DataSource,c));this.m_Props.push(this.m_Color=new VBI.AttributeProperty(d,'color',this.m_DataSource,c));this.m_Props.push(this.m_Slices=new VBI.AttributeProperty(d,'slices',this.m_DataSource,c));this.m_Props.push(this.m_FxSize=new VBI.AttributeProperty(d,'fxsize',this.m_DataSource,c))};this.RenderInstance=function(n,c,d,p,a,b,e,s){var f=c.m_Scene;var z=f.GetCurrentZoomFactors();var r=e/z[0];var t=f.GetPointsFromPos(p,false);for(var i=0;i<t.length;i++){var g=t[i];d.beginPath();d.lineWidth=1;d.beginPath();d.arc(g[0],g[1],r,0,2*Math.PI);d.fillStyle=a;d.fill();d.lineWidth=1;d.strokeStyle=b;d.stroke()}};this.Render=function(a,d){Object.getPrototypeOf(this).m_BB.length=0;var b=a.m_Scene;var n;if(n=this.m_DataSource.GetCurrentNode(b.m_Ctx)){for(var e=0;e<n.m_dataelements.length;++e){this.m_DataSource.Select(e);var p=this.m_Pos.GetValueVector(b.m_Ctx);var f=this.m_ColorBorder.GetValueColor(b.m_Ctx);var r=this.m_Radius.GetValueFloat(b.m_Ctx);var c=this.m_Color.GetValueColor(b.m_Ctx);var s=this.m_Slices.GetValueLong(b.m_Ctx);this.RenderInstance(e,a,d,p,c,f,r,s)}}else{}}};VBI.VisualObjects.Circle.prototype=VBI.VisualObjects.Base;VBI.VisualObjects.CircleDist=function(){this.load=function(d,c){Object.getPrototypeOf(this).load(this,d,c);this.m_Props=[];this.m_Props.push(this.m_DataSource=new VBI.NodeProperty(d,'datasource',null,c));this.m_Props.push(this.m_Pos=new VBI.AttributeProperty(d,'midpoint',this.m_DataSource,c));this.m_Props.push(this.m_ColorBorder=new VBI.AttributeProperty(d,'colorBorder',this.m_DataSource,c));this.m_Props.push(this.m_Radius=new VBI.AttributeProperty(d,'radius',this.m_DataSource,c));this.m_Props.push(this.m_Tooltip=new VBI.AttributeProperty(d,'tooltip',this.m_DataSource,c));this.m_Props.push(this.m_Color=new VBI.AttributeProperty(d,'color',this.m_DataSource,c));this.m_Props.push(this.m_Slices=new VBI.AttributeProperty(d,'slices',this.m_DataSource,c))};this.RenderInstance=function(n,c,d,p,a,b,r,s){var e=c.m_Scene;var f=VBI.MathLib.EquidistantLonLat(VBI.MathLib.DegToRad(p),r,s);d.beginPath();var x;var t=e.GetPointsFromGeo(f[0],false);for(var i=0;i<t.length;i++){tmp=t[i];d.moveTo(tmp[0],tmp[1]);for(var g=1;g<f.length;g++){x=e.GetPointFromGeo(f[g],true,tmp,true);if(((tmp[0]-x[0])*(tmp[0]-x[0])+(tmp[1]-x[1])*(tmp[1]-x[1]))<5.0)continue;d.lineTo(x[0],x[1]);tmp=x}d.closePath();d.strokeStyle=b;d.lineWidth=1;d.stroke();d.fillStyle=a;d.fill()}};this.Render=function(a,d){Object.getPrototypeOf(this).m_BB.length=0;var b=a.m_Scene;var n;if(n=this.m_DataSource.GetCurrentNode(b.m_Ctx)){for(var e=0;e<n.m_dataelements.length;++e){this.m_DataSource.Select(e);var p=this.m_Pos.GetValueVector(b.m_Ctx);var f=this.m_ColorBorder.GetValueColor(b.m_Ctx);var r=this.m_Radius.GetValueFloat(b.m_Ctx);var c=this.m_Color.GetValueColor(b.m_Ctx);var s=this.m_Slices.GetValueLong(b.m_Ctx);this.RenderInstance(e,a,d,p,c,f,r,s)}}else{}}};VBI.VisualObjects.CircleDist.prototype=VBI.VisualObjects.Base;VBI.VisualObjects.m_AC=["rgba(0,143,211,1.0)","rgba(153,209,1,1.0)","rgba(243,155,2,1.0)","rgba(159,207,236,1.0)","rgba(75,167,7,1.0)","rgba(246,209,51,1.0)","rgba(203,77,44,1.0)","rgba(202,199,186,1.0)","rgba(13,134,156,1.0)","rgba(205,215,46,1.0)","rgba(36,114,48,1.0)","rgba(108,222,220,1.0)","rgba(235,115,0,1.0)","rgba(185,187,209,1.0)","rgba(0,109,211,1.0)","rgba(61,185,127,1.0)","rgba(165,84,148,1.0)","rgba(1,88,43,1.0)","rgba(77,182,239,1.0)","rgba(175,43,23,1.0)","rgba(212,153,18,1.0)","rgba(187,204,210,1.0)","rgba(48,146,13,1.0)","rgba(29,169,193,1.0)","rgba(42,71,201,1.0)","rgba(209,153,194,1.0)","rgba(204,88,38,1.0)","rgba(114,191,68,1.0)","rgba(10,72,157,1.0)","rgba(151,156,163,1.0)","rgba(14,145,144,1.0)","rgba(97,32,154,1.0)"];VBI.VisualObjects.Pie=function(){this.load=function(d,c){Object.getPrototypeOf(this).load(this,d,c);this.m_Props=[];this.m_Props.push(this.m_DataSource=new VBI.NodeProperty(d,'datasource',null,c));this.m_Props.push(this.m_Series=new VBI.NodeProperty(d,'series',this.m_DataSource,c));this.m_Props.push(this.m_Scale=new VBI.AttributeProperty(d,'scale',this.m_DataSource,c));this.m_Props.push(this.m_Pos=new VBI.AttributeProperty(d,'pos',this.m_DataSource,c));this.m_Props.push(this.m_Values=new VBI.AttributeProperty(d,'value',this.m_Series,c));this.m_Props.push(this.m_Texts=new VBI.AttributeProperty(d,'text',this.m_Series,c));this.m_Props.push(this.m_Tooltips=new VBI.AttributeProperty(d,'tooltip',this.m_Series,c))};this.RenderInstance=function(n,c,d,x,r,a,t,b){var e=0;for(var f=0;f<a.length;++f)e+=a[f];var l=3*Math.PI/2;for(var f=0;f<a.length;++f){var g=d.createRadialGradient(x[0],x[1],0,x[0],x[1],r);var h=VBI.VisualObjects.m_AC[f%VBI.VisualObjects.m_AC.length];g.addColorStop(0,h);g.addColorStop(0.95,h);g.addColorStop(1.0,'rgba(255, 255, 255, 0.0 )');d.fillStyle=g;d.beginPath();d.moveTo(x[0],x[1]);d.arc(x[0],x[1],r,l,l+(Math.PI*2*(a[f]/e)),false);d.lineTo(x[0],x[1]);d.fill();l+=Math.PI*2*(a[f]/e)}};this.Render=function(c,d){Object.getPrototypeOf(this).m_BB.length=0;var s=c.m_Scene;var n,a;var z=s.GetCurrentZoomFactors();if(n=this.m_DataSource.GetCurrentNode(s.m_Ctx))for(var b=0;b<n.m_dataelements.length;++b){this.m_DataSource.Select(b);var p=this.m_Pos.GetValueVector(s.m_Ctx);var S=this.m_Scale.GetValueVector(s.m_Ctx);var r=16*S[0]/z[0];var x=s.GetPointsFromPos(p,true);for(var i=0;i<x.length;++i){var e=x[i];if((e[0]+r<0)||(e[0]-r>s.m_nWidthCanvas)||(e[1]+r<0)||(e[1]-r>s.m_nHeightCanvas))continue;var V=[],t=[],T=[];if(a=this.m_Series.GetCurrentNode(s.m_Ctx))for(var f=0;f<a.m_dataelements.length;++f){this.m_Series.Select(f);V.push(this.m_Values.GetValueFloat(s.m_Ctx));t.push(this.m_Texts.GetValueString(s.m_Ctx));T.push(this.m_Tooltips.GetValueString(s.m_Ctx))}this.RenderInstance(b,c,d,e,r,V,t,T)}}}};VBI.VisualObjects.Pie.prototype=VBI.VisualObjects.Base;VBI.VisualObjects.Box=function(){this.load=function(d,c){Object.getPrototypeOf(this).load(this,d,c);this.m_Props=[];this.m_Props.push(this.m_DataSource=new VBI.NodeProperty(d,'datasource',null,c));this.m_Props.push(this.m_Pos=new VBI.AttributeProperty(d,'pos',this.m_DataSource,c));this.m_Props.push(this.m_Scale=new VBI.AttributeProperty(d,'scale',this.m_DataSource,c));this.m_Props.push(this.m_Tooltip=new VBI.AttributeProperty(d,'tooltip',this.m_Series,c));this.m_Props.push(this.m_Color=new VBI.AttributeProperty(d,'color',this.m_DataSource,c))};this.RenderInstance=function(n,c,d,x,s,a){var e=c.m_Scene;if(!s)s=[1.0,1.0,1.0];if(!a)a="#6f6f7a";var z=e.GetCurrentZoomFactors();var f=500;var g=f*s[0]/z[0];var h=f*s[1]/z[1];var l=x[0]-g/2;var t=x[1]-h/2;var r=x[0]+g/2;var b=x[1]+h/2;d.fillStyle=a;d.fillRect(l,t,g,h);d.lineWidth=1;d.strokeStyle="red";d.strokeRect(l,t,g,h);this.m_BB[n]=[l,t,r,b]};this.Render=function(c,d){Object.getPrototypeOf(this).m_BB.length=0;var s=c.m_Scene;var n;if(n=this.m_DataSource.GetCurrentNode(s.m_Ctx)){for(var a=0;a<n.m_dataelements.length;++a){this.m_DataSource.Select(a);var p=this.m_Pos.GetValueVector(s.m_Ctx);var x=s.GetPointsFromPos(p,false);for(var i=0;i<x.length;i++){xyz=x[i];if(!xyz.m_bVisible)return;var S=this.m_Scale.GetValueVector(s.m_Ctx);var C=this.m_Color.GetValueColor(s.m_Ctx);this.RenderInstance(a,c,d,xyz,S,C)}}}else{}}};VBI.VisualObjects.Box.prototype=VBI.VisualObjects.Base;VBI.VisualObjects.Dummy=function(){this.load=function(d,c){Object.getPrototypeOf(this).load(this,d,c)};this.RenderInstance=function(n,c,d,x,s,a){};this.Render=function(c,d){}};VBI.VisualObjects.Dummy.prototype=VBI.VisualObjects.Base;return v};
