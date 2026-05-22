import { useState, useEffect, useRef } from "react";

// ─── PROJECT DATA ──────────────────────────────────────────────────────────────
const P = [
  { id:"hyundai", brand:"현대카드", period:"2024", role:"lead", ai:true,
    tag:"프리미엄 금융 브랜드의 디지털 크리에이티브 총괄",
    stats:[{l:"연간 소재",v:"1,228"},{l:"CTR",v:"2×"},{l:"노출",v:"20억+"}],
    desc:"현대카드 전 카드 라인업의 디지털 광고 크리에이티브를 총괄 리딩. 브랜드 일관성을 유지하면서 카드별 차별화된 비주얼 전략을 수립하고, 하반기 CTR 2배 개선을 달성.",
    proc:"크리에이티브 방향성 수립 → 기획팀 커뮤니케이션 → 팀 내 업무 분배 → 시안 리뷰 → 성과 모니터링",
    thumb:"/portfolio_images/hyundai_main.jpg",
    imgs:["/portfolio_images/hyundai_main.jpg","/portfolio_images/hyundai_02.jpg","/portfolio_images/hyundai_03.jpg","/portfolio_images/hyundai_04.jpg","/portfolio_images/hyundai_05.jpg","/portfolio_images/hyundai_06.jpg","/portfolio_images/hyundai_07.jpg","/portfolio_images/hyundai_08.jpg","/portfolio_images/hyundai_09.jpg","/portfolio_images/hyundai_10.jpg"] },
  { id:"coupang", brand:"쿠팡풀필먼트", period:"2024–25", role:"handson", ai:true,
    tag:"데일리 카카오 플친 소재 대량 제작",
    stats:[{l:"발송",v:"Daily"},{l:"총 소재",v:"6,900+"}],
    desc:"카카오 플러스친구 채널의 데일리 프로모션 소재를 직접 기획·제작·운영. 대량 제작 환경에서 일관된 퀄리티와 효율적 워크플로우 구축.",
    proc:"프로모션 캘린더 → 소재 기획 → 디자인 제작 → 검수 → 발송",
    thumb:"/portfolio_images/coupang_main.jpg",
    imgs:["/portfolio_images/coupang_main.jpg","/portfolio_images/coupang_02.jpg","/portfolio_images/coupang_03.jpg","/portfolio_images/coupang_04.jpg","/portfolio_images/coupang_05.jpg","/portfolio_images/coupang_06.jpg","/portfolio_images/coupang_07.jpg","/portfolio_images/coupang_08.jpg","/portfolio_images/coupang_09.jpg","/portfolio_images/coupang_10.jpg","/portfolio_images/coupang_11.jpg"] },
  { id:"spirit", brand:"스피릿테일즈", period:"2024", role:"lead", ai:true,
    tag:"게임 런칭 DA 캠페인 크리에이티브 리드",
    stats:[{l:"포맷",v:"DA/BSA/KV"}],
    desc:"스피릿테일즈 게임 런칭 및 시즌별 업데이트 캠페인의 크리에이티브 방향성 수립 및 팀 리딩.",
    proc:"IP 분석 → 타깃 설정 → 컨셉 수립 → 시안 리딩 → 매체 최적화",
    thumb:"/portfolio_images/spirit_main.jpg",
    imgs:["/portfolio_images/spirit_main.jpg","/portfolio_images/spirit_02.jpg","/portfolio_images/spirit_03.jpg","/portfolio_images/spirit_04.jpg","/portfolio_images/spirit_05.jpg","/portfolio_images/spirit_06.jpg","/portfolio_images/spirit_07.jpg"] },
  { id:"ali", brand:"알리익스프레스", period:"2024", role:"collab", ai:true,
    tag:"글로벌 이커머스 DA 캠페인",
    stats:[{l:"캠페인",v:"BSA/타임딜"}],
    desc:"알리익스프레스의 다양한 프로모션 DA 소재 기획 및 제작 협업.",
    proc:"글로벌 가이드 → 로컬라이제이션 → 소재 제작 → 매체 협업",
    thumb:"/portfolio_images/ali_main.jpg",
    imgs:["/portfolio_images/ali_main.jpg","/portfolio_images/ali_01.jpg","/portfolio_images/ali_02.jpg","/portfolio_images/ali_03.jpg","/portfolio_images/ali_04.jpg","/portfolio_images/ali_05.jpg","/portfolio_images/ali_06.jpg","/portfolio_images/ali_07.jpg","/portfolio_images/ali_08.jpg","/portfolio_images/ali_09.jpg","/portfolio_images/ali_10.jpg","/portfolio_images/ali_11.jpg"] },
  { id:"woori", brand:"우리카드", period:"2025", role:"lead", ai:false,
    tag:"금융 브랜드 크리에이티브 운영", stats:[],
    desc:"우리카드 디지털 광고 크리에이티브 운영 및 리딩.",
    proc:"브리프 → 방향성 → 팀 배분 → 리뷰 → 산출",
    thumb:"/portfolio_images/woori_main.jpg",
    imgs:["/portfolio_images/woori_main.jpg","/portfolio_images/woori_02.jpg","/portfolio_images/woori_03.jpg","/portfolio_images/woori_04.jpg","/portfolio_images/woori_05.jpg","/portfolio_images/woori_06.jpg","/portfolio_images/woori_07.jpg","/portfolio_images/woori_08.jpg"] },
  { id:"hanwha", brand:"한화", period:"2024", role:"collab", ai:false,
    tag:"한화 그룹 디지털 광고 크리에이티브", stats:[],
    desc:"한화 그룹 계열사 디지털 광고 소재 기획 및 제작 협업.",
    proc:"브리프 분석 → 컨셉 도출 → 디자인 → 리뷰 → 산출",
    thumb:"/portfolio_images/hanwha_main.jpg",
    imgs:["/portfolio_images/hanwha_main.jpg","/portfolio_images/hanwha_02.jpg","/portfolio_images/hanwha_03.jpg","/portfolio_images/hanwha_04.jpg","/portfolio_images/hanwha_05.jpg","/portfolio_images/hanwha_06.jpg","/portfolio_images/hanwha_07.jpg","/portfolio_images/hanwha_08.jpg"] },
  { id:"dibambi", brand:"디밤비", period:"2024", role:"collab", ai:false,
    tag:"뷰티 브랜드 디지털 크리에이티브", stats:[],
    desc:"디밤비 뷰티 브랜드 디지털 광고 소재 기획 및 제작 협업.",
    proc:"브리프 분석 → 컨셉 도출 → 디자인 → 리뷰 → 산출",
    thumb:"/portfolio_images/dibambi_01.jpg",
    imgs:["/portfolio_images/dibambi_01.jpg","/portfolio_images/dibambi_02.jpg","/portfolio_images/dibambi_03.jpg","/portfolio_images/dibambi_04.jpg"] },
];

// ─── 21년의 밤 — AI 프로젝트 데이터 ──────────────────────────────────────────
const NIGHT_SCENES = [
  { id:1, act:1, scene:"Sc.01", title:"기억의 문", desc:"꿈속 첫 번째 복도. 어린 시절의 잔상들이 벽을 채운다.", imgUrl: "/portfolio_images/scene01.jpg" },
  { id:2, act:1, scene:"Sc.02", title:"잠든 도시", desc:"새벽 3시, 아무도 없는 거리. 가로등 빛이 물웅덩이에 번진다.", imgUrl: "/portfolio_images/scene02.jpg" },
  { id:3, act:1, scene:"Sc.03", title:"서랍 속", desc:"열리지 않는 서랍. 그 안에 무엇이 있는지 알면서도 열지 못한다.", imgUrl: "/portfolio_images/scene03.jpg" },
  { id:4, act:1, scene:"Sc.04", title:"첫 번째 균열", desc:"천장에서 시작된 균열이 바닥까지 내려온다. 소리 없이.", imgUrl: "/portfolio_images/scene04.jpg" },
  { id:5, act:1, scene:"Sc.05", title:"반복", desc:"같은 계단을 오르는 꿈. 몇 번째인지 세는 것을 멈췄다.", imgUrl: "/portfolio_images/scene05.jpg" },
  { id:6, act:2, scene:"Sc.06", title:"마주침", desc:"거울 속에서 눈이 마주쳤다. 내가 먼저 눈을 피했다.", imgUrl: "/portfolio_images/scene06.jpg" },
  { id:7, act:2, scene:"Sc.07", title:"수몰", desc:"물이 차오른다. 당황하지 않는 자신이 더 낯설다.", imgUrl: "/portfolio_images/scene07.jpg" },
  { id:8, act:2, scene:"Sc.08", title:"목소리", desc:"이름을 부르는 목소리. 돌아보면 항상 아무도 없다.", imgUrl: "/portfolio_images/scene08.jpg" },
  { id:9, act:2, scene:"Sc.09", title:"경계", desc:"꿈인지 현실인지 구분이 흐려지는 순간들.", imgUrl: "/portfolio_images/scene09.jpg" },
  { id:10, act:2, scene:"Sc.10", title:"21년", desc:"21년이 하나의 프레임으로 압축된다. 무게가 느껴진다.", imgUrl: "/portfolio_images/scene10.jpg" },
  { id:11, act:3, scene:"Sc.11", title:"해방", desc:"무거운 것을 내려놓는 꿈. 무엇인지는 깨어나면 잊힌다.", imgUrl: "/portfolio_images/scene11.jpg" },
  { id:12, act:3, scene:"Sc.12", title:"새벽빛", desc:"창문으로 들어오는 빛. 먼지가 빛 속에서 춤춘다.", imgUrl: "/portfolio_images/scene12.jpg" },
  { id:13, act:3, scene:"Sc.13", title:"귀환", desc:"어딘가로 돌아가는 꿈. 어디인지 알 것 같은 느낌.", imgUrl: "/portfolio_images/scene13.jpg" },
  { id:14, act:3, scene:"Sc.14", title:"눈을 뜨다", desc:"꿈의 마지막 프레임. 이것이 끝인지 시작인지.", imgUrl: "/portfolio_images/scene14.jpg" },
];

const WORKFLOW = [
  { step:"01", tool:"시나리오", detail:"꿈일기 기반 3막 14씬 스크립트", color:"#c4b1f0" },
  { step:"02", tool:"Midjourney", detail:"씬별 키 비주얼 생성", color:"#b4a0f0" },
  { step:"03", tool:"Nano Banana", detail:"보조 이미지 생성 · 크로스체크", color:"#a08ce6" },
  { step:"04", tool:"Higgsfield / Kling", detail:"스틸 → 모션 변환", color:"#8c78d2" },
  { step:"05", tool:"Topaz", detail:"업스케일 · 노이즈 제거", color:"#7864be" },
  { step:"06", tool:"Premiere", detail:"최종 편집 · 사운드 믹싱", color:"#6450aa" },
];

const RM = {
  handson: { l:"HANDS-ON", bg:"rgba(196,177,240,0.85)", fg:"#0a0714" },
  lead: { l:"LEAD", bg:"#ffffff", fg:"#0a0714" },
  collab: { l:"COLLAB", bg:"rgba(196,177,240,0.25)", fg:"#e8e0ff" },
};

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function Particles() {
  const pts = Array.from({length:30},(_, i)=>({
    i, x:Math.random()*100, y:Math.random()*100,
    s:Math.random()*1.2+0.4, d:Math.random()*5, du:Math.random()*4+4, o:Math.random()*0.25+0.05
  }));
  return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
    {pts.map(p=><div key={p.i} style={{
      position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,borderRadius:"50%",
      background:`rgba(196,177,240,${p.o})`,animation:`float ${p.du}s ${p.d}s ease-in-out infinite alternate`
    }}/>)}
  </div>;
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function Card({p,i,onClick}) {
  const [h,setH]=useState(false);
  const [thumbErr,setThumbErr]=useState(false);
  return <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{
      position:"relative",cursor:"pointer",overflow:"hidden",borderRadius:8,aspectRatio:"4/3",
      background:"linear-gradient(145deg, #161324 0%, #0f0c18 100%)",
      border:`1px solid ${h?"rgba(196,177,240,0.25)":"rgba(255,255,255,0.04)"}`,
      transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",transform:h?"translateY(-4px)":"none",
      boxShadow:h?"0 16px 40px rgba(100,80,160,0.15)":"none",animation:`revealCard 0.5s ${i*0.04}s ease-out both`
    }}>
    {p.thumb && !thumbErr
      ? <img src={p.thumb} alt={p.brand} onError={()=>setThumbErr(true)} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:h?0.55:0.35,transition:"opacity 0.4s"}}/>
      : <div style={{position:"absolute",top:"45%",left:"50%",transform:"translate(-50%,-50%)",fontFamily:"'Playfair Display',serif",fontSize:130,fontWeight:300,color:"rgba(196,177,240,0.03)",userSelect:"none"}}>{p.brand.charAt(0)}</div>
    }
    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(10,7,20,0.95) 0%, rgba(10,7,20,0.4) 60%, transparent 100%)"}}/>
    <div style={{position:"absolute",inset:0,background:h?"radial-gradient(circle at 50% 80%, rgba(196,177,240,0.05) 0%, transparent 70%)":"none"}}/>

    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:24,zIndex:1}}>
      <div style={{display:"flex",gap:6,marginBottom:12,alignItems:"center"}}>
        <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",fontFamily:"'DM Sans',sans-serif",padding:"3px 9px",borderRadius:3,background:RM[p.role].bg,color:RM[p.role].fg}}>{RM[p.role].l}</span>
        {p.ai&&<span style={{fontSize:9,fontWeight:600,padding:"3px 7px",borderRadius:3,background:"rgba(196,177,240,0.15)",color:"#c4b1f0",border:"1px solid rgba(196,177,240,0.1)"}}>AI</span>}
        <span style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginLeft:"auto"}}>{p.period}</span>
      </div>
      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:400,color:"rgba(255,255,255,0.95)",marginBottom:4}}>{p.brand}</h3>
      <p style={{fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.4,fontWeight:300}}>{p.tag}</p>
    </div>
  </div>;
}

// ─── 21년의 밤 SCENE CARD ────────────────────────────────────────────────────
function SceneCard({scene, onClick}) {
  const [h,setH]=useState(false);
  const [imgErr, setImgErr] = useState(false);
  return <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{
      cursor:"pointer",borderRadius:6,overflow:"hidden",aspectRatio:"3/4",position:"relative",
      background:"#110e1c",border:`1px solid ${h?"rgba(196,177,240,0.3)":"rgba(255,255,255,0.04)"}`,
      transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",transform:h?"translateY(-6px)":"none",
      boxShadow:h?"0 16px 40px rgba(100,80,160,0.2)":"none"
    }}>
    {scene.imgUrl && !imgErr ? (
      <img src={scene.imgUrl} alt={scene.title} onError={() => setImgErr(true)} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:h?0.95:0.7,transition:"all 0.4s"}}/>
    ) : (
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"#151222"}}>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:52,fontWeight:300,color:"rgba(196,177,240,0.06)"}}>{scene.id.toString().padStart(2,"0")}</span>
      </div>
    )}
    <div style={{position:"absolute",inset:0,background:`linear-gradient(to top, rgba(10,7,20,0.95) 0%, rgba(10,7,20,0.3) 60%, transparent 100%)`,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:18,zIndex:1}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:"rgba(196,177,240,0.6)",marginBottom:4}}>
        <span>ACT {scene.act}</span><span>{scene.scene}</span>
      </div>
      <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:"#fff",marginBottom:4,fontStyle:"italic"}}>{scene.title}</h4>
      <p style={{fontSize:11,color:"rgba(255,255,255,0.45)",maxHeight:h?45:0,opacity:h?1:0,overflow:"hidden",transition:"all 0.3s ease"}}>{scene.desc}</p>
    </div>
  </div>;
}

// ─── HIGH VISIBILITY SINGLE-COLUMN MOOD MODAL (V4 INTEGRATED) ─────────────────
function UniversalModal({isOpen, onClose, title, subtitle, badges, desc, proc, stats, imgUrl, imgs, children}) {
  const [imgErr, setImgErr] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const mainImg = imgs && imgs.length > 0 ? imgs[activeImg] : imgUrl;

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = "hidden"; setActiveImg(0); }
    return () => { document.body.style.overflow = "" };
  }, [isOpen]);

  if (!isOpen) return null;

  return <div onClick={onClose} style={{
    position:"fixed",inset:0,zIndex:300,background:"rgba(5,4,10,0.96)",backdropFilter:"blur(20px)",
    display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.2s ease-out",padding:"2vh 2vw"
  }}>
    <div onClick={e=>e.stopPropagation()} style={{
      width:"94vw",height:"94vh",maxWidth:1000,borderRadius:16,overflow:"hidden",
      border:"1px solid rgba(196,177,240,0.22)",display:"flex",flexDirection:"column",position:"relative",
      boxShadow:"0 32px 80px rgba(0,0,0,0.8)",background:"#0a0714"
    }}>
      {/* Header Close Button */}
      <button onClick={onClose} style={{
        position:"absolute",top:24,right:28,zIndex:10,background:"none",border:"1px solid rgba(255,255,255,0.2)",
        color:"rgba(255,255,255,0.6)",width:36,height:36,borderRadius:8,cursor:"pointer",fontSize:18,
        display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"
      }} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,177,240,0.5)";e.currentTarget.style.color="#fff"}}>×</button>

      {/* Scroll Body */}
      <div style={{position:"relative",zIndex:1,flexGrow:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
        
        {/* 메인 이미지 - 원본 비율 유지 */}
        <div style={{
          width:"100%",maxHeight:"55vh",background:"#040306",position:"relative",
          display:"flex",alignItems:"center",justifyContent:"center",borderBottom:"1px solid rgba(196,177,240,0.18)",
          overflow:"hidden"
        }}>
          {mainImg && !imgErr ? (
            <img src={mainImg} alt={title} onError={()=>setImgErr(true)} style={{width:"100%",height:"100%",objectFit:"contain",maxHeight:"55vh"}}/>
          ) : (
            <div style={{textAlign:"center",padding:"48px 20px"}}>
              <p style={{fontSize:11,color:"rgba(196,177,240,0.6)",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.22em",fontWeight:700}}>VISUAL ASSETS</p>
              <p style={{fontSize:12,color:"rgba(255,255,255,0.35)",fontWeight:300,marginTop:6}}>소재 이미지 준비 중</p>
            </div>
          )}
        </div>

        {/* 썸네일 갤러리 */}
        {imgs && imgs.length > 1 && (
          <div style={{display:"flex",gap:6,padding:"12px 20px",overflowX:"auto",background:"rgba(0,0,0,0.4)",borderBottom:"1px solid rgba(196,177,240,0.08)",flexShrink:0}}>
            {imgs.map((img,i)=>(
              <div key={i} onClick={()=>{setActiveImg(i);setImgErr(false)}} style={{
                width:64,height:48,flexShrink:0,borderRadius:4,overflow:"hidden",cursor:"pointer",
                border:`2px solid ${activeImg===i?"rgba(196,177,240,0.8)":"rgba(255,255,255,0.1)"}`,
                transition:"all 0.2s",opacity:activeImg===i?1:0.5,
              }}>
                <img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}
                  onError={e=>{e.target.parentElement.style.display="none"}}/>
              </div>
            ))}
          </div>
        )}

        {/* 하단 정보 레이아웃 */}
        <div style={{padding:"36px 48px 60px",maxWidth:820,margin:"0 auto",width:"100%"}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
            {badges}
          </div>

          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:400,color:"#ffffff",lineHeight:1.2,marginBottom:6}}>{title}</h2>
          <p style={{fontSize:14,color:"rgba(196,177,240,0.8)",fontWeight:400,fontFamily:"'Noto Sans KR',sans-serif",marginBottom:32}}>{subtitle}</p>

          {/* 주요 수치 지표 (Stats) */}
          {stats && stats.length > 0 && (
            <div style={{display:"flex",gap:48,padding:"20px 0",marginBottom:32,borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              {stats.map((s,i)=><div key={i}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:400,color:"#c4b1f0"}}>{s.v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.1em",marginTop:2}}>{s.l}</div>
              </div>)}
            </div>
          )}

          {/* 상세 디스크립션 플로우 */}
          <div style={{display:"flex",flexDirection:"column",gap:36,marginTop:12}}>
            <div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",color:"rgba(196,177,240,0.8)",fontWeight:700,marginBottom:10}}>OVERVIEW</p>
              <p style={{fontSize:15,lineHeight:2.0,color:"rgba(255,255,255,0.85)",fontWeight:300}}>{desc}</p>
            </div>

            <div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",color:"rgba(196,177,240,0.8)",fontWeight:700,marginBottom:10}}>PROCESS FLOW</p>
              <p style={{fontSize:14,lineHeight:1.85,color:"rgba(255,255,255,0.6)",fontWeight:300}}>{proc}</p>
            </div>

            {children}
          </div>
        </div>

      </div>
    </div>
  </div>;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [sel, setSel] = useState(null);
  const [selScene, setSelScene] = useState(null);
  const [fil, setFil] = useState("all");
  const [sy, setSy] = useState(0);
  const gRef = useRef(null);
  const nightRef = useRef(null);

  useEffect(()=>{
    const h=()=>setSy(window.scrollY);
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[]);

  const list = fil === "all" ? P : P.filter(p=>p.role===fil);

  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@200;300;400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{background:#07050e;overflow-x:hidden}
      ::selection{background:rgba(196,177,240,0.35);color:#fff}
      ::-webkit-scrollbar{width:3px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:rgba(196,177,240,0.25);border-radius:2px}
      @keyframes revealCard{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes modalSlide{from{opacity:0;transform:translateY(24px) scale(0.99)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes float{from{transform:translateY(0)}to{transform:translateY(-6px)}}
      @keyframes drift{0%{opacity:0;transform:translateY(40px)}100%{opacity:1;transform:translateY(0)}}
      .nl{transition:all 0.3s;cursor:pointer;color:rgba(255,255,255,0.45)}
      .nl:hover{color:#c4b1f0}
      .fp{transition:all 0.3s;cursor:pointer}
      .fp:hover{background:rgba(196,177,240,0.12)!important}
    `}</style>

    <div style={{fontFamily:"'Noto Sans KR',sans-serif",color:"#fff",position:"relative",minHeight:"100vh"}}>
      <Particles/>
      
      {/* Ambient 빛 안개 배경 노출 증폭 */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
        background:`
          radial-gradient(ellipse 70% 60% at 20% 80%, rgba(140,110,230,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 20%, rgba(196,177,240,0.04) 0%, transparent 50%)
        `
      }}/>

      {/* NAV */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:50,
        padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",
        background:sy>80?"rgba(10,8,18,0.95)":"transparent",backdropFilter:sy>80?"blur(20px)":"none",
        borderBottom:sy>80?"1px solid rgba(196,177,240,0.1)":"none",transition:"all 0.4s"
      }}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:300,letterSpacing:"0.12em"}}>
          FROM.<span style={{fontWeight:500,fontStyle:"italic",color:"#c4b1f0"}}>S</span>
        </div>
        <div style={{display:"flex",gap:28,fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:500,letterSpacing:"0.08em"}}>
          <span className="nl" onClick={()=>gRef.current?.scrollIntoView({behavior:"smooth"})}>WORK</span>
          <span className="nl" onClick={()=>nightRef.current?.scrollIntoView({behavior:"smooth"})} style={{color:"#c4b1f0"}}>21년의 밤</span>
          <span className="nl" onClick={()=>document.getElementById("proc")?.scrollIntoView({behavior:"smooth"})}>PROCESS</span>
          <a href="mailto:pilotfish89@gmail.com" className="nl" style={{textDecoration:"none",color:"inherit"}}>CONTACT</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",position:"relative",zIndex:1,textAlign:"center"}}>
        <div style={{animation:"drift 0.8s ease-out both"}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.35em",color:"#c4b1f0",fontWeight:600,marginBottom:24}}>DESIGN PORTFOLIO</p>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(52px,9vw,105px)",fontWeight:300,letterSpacing:"0.06em",lineHeight:0.95,marginBottom:16}}>
            <span style={{color:"rgba(255,255,255,0.9)"}}>FROM.</span><span style={{fontStyle:"italic",fontWeight:400,color:"#c4b1f0"}}>S</span>
          </h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:"0.18em",color:"rgba(255,255,255,0.4)",fontWeight:400,marginBottom:52}}>이슬비 — Creative Lead & Designer</p>
          <div style={{display:"flex",gap:56,justifyContent:"center"}}>
            {[{n:"10+",l:"YEARS"},{n:"1,228",l:"CREATIVES"},{n:"2×",l:"CTR LIFT"}].map((s,i)=>(
              <div key={i}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:300,color:"#fff"}}>{s.n}</div>
                <div style={{fontSize:9,letterSpacing:"0.2em",color:"rgba(196,177,240,0.5)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 상단 운영 퍼포먼스 자산 아카이브 (살아있음) ─── */}
      <section ref={gRef} style={{position:"relative",zIndex:1,padding:"40px 40px 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:16}}>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.3em",color:"rgba(196,177,240,0.6)",fontWeight:600,marginBottom:6}}>SELECTED WORK</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:300,color:"#ffffff"}}>Projects</h2>
          </div>
          <div style={{display:"flex",gap:6}}>
            {[{id:"all",l:"ALL"},{id:"handson",l:"HANDS-ON"},{id:"lead",l:"LEAD"},{id:"collab",l:"COLLAB"}].map(f=>(
              <button key={f.id} className="fp" onClick={()=>setFil(f.id)} style={{
                padding:"6px 16px",borderRadius:4,fontSize:10,letterSpacing:"0.12em",fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",
                border:`1px solid ${fil===f.id?"rgba(196,177,240,0.5)":"rgba(255,255,255,0.08)"}`,
                background:fil===f.id?"rgba(196,177,240,0.18)":"transparent",color:fil===f.id?"#c4b1f0":"rgba(255,255,255,0.45)"
              }}>{f.l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {list.map((p,i)=><Card key={p.id} p={p} i={i} onClick={()=>setSel(p)}/>)}
        </div>
      </section>

      {/* ─── 21년의 밤 SHOWCASE ─── */}
      <section ref={nightRef} style={{position:"relative",zIndex:1,padding:"80px 40px 100px",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",background:`radial-gradient(ellipse 100% 60% at 50% 10%, rgba(130,100,240,0.25) 0%, transparent 75%)`}}/>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
          <div style={{marginBottom:48}}>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.3em",color:"#c4b1f0",fontWeight:700}}>AI FILM PROJECT</p>
              <span style={{padding:"3px 12px",borderRadius:3,fontSize:9,fontWeight:700,fontFamily:"'DM Sans',sans-serif",background:"rgba(196,177,240,0.2)",color:"#c4b1f0",border:"1px solid rgba(196,177,240,0.25)"}}>진행 중</span>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,5vw,68px)",fontWeight:300,color:"#fff",marginBottom:16,fontStyle:"italic"}}>21년의 밤</h2>
            <p style={{fontSize:15,color:"rgba(255,255,255,0.8)",lineHeight:1.85,fontWeight:300,maxWidth:600}}>꿈일기를 원천으로 한 AI 단편 영상 프로젝트. 21년의 기억을 3막 14씬으로 재구성하고 비주얼 실험을 수행합니다.</p>
          </div>

          {[1,2,3].map(act=>{
            const actScenes = NIGHT_SCENES.filter(s=>s.act===act);
            const actTitles={1:"기억의 시작",2:"균열과 침잠",3:"귀환과 각성"};
            return <div key={act} style={{marginBottom:48}}>
              <div style={{display:"flex",alignItems:"baseline",gap:16,marginBottom:20}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:"#c4b1f0",fontStyle:"italic"}}>Act {act}</span>
                <span style={{fontSize:19,fontWeight:400,color:"#fff"}}>{actTitles[act]}</span>
                <div style={{flexGrow:1,height:1,background:"rgba(255,255,255,0.12)"}}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12}}>
                {actScenes.map(scene=><SceneCard key={scene.id} scene={scene} onClick={()=>setSelScene(scene)}/>)}
              </div>
            </div>;
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section id="proc" style={{position:"relative",zIndex:1,padding:"60px 40px",maxWidth:1200,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:300,marginBottom:36}}>Process</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
          {[
            {n:"01",t:"전략 수립",d:"brand 분석과 KPI 기반의 크리에이티브 방향성 도출"},
            {n:"02",t:"컨셉 기획",d:"메시지 설계, 비주얼 컨셉, AI 활용 프로토타이핑"},
            {n:"03",t:"제작 · 리딩",d:"핸즈온 디자인 또는 팀 디렉팅과 품질 관리"},
            {n:"04",t:"성과 최적화",d:"데이터 기반 소재 개선, A/B 테스트, CTR 모니터링"},
          ].map((s,i)=>(
            <div key={i} style={{padding:24,borderRadius:6,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:"rgba(196,177,240,0.2)"}}>{s.n}</span>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"rgba(255,255,255,0.85)",marginTop:8,marginBottom:6}}>{s.t}</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.6}}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UNIVERSAL MODAL ─ BRAND WORK LAYER */}
      {sel && (
        <UniversalModal 
          isOpen={!!sel} onClose={()=>setSel(null)} title={sel.brand} subtitle={sel.tag} stats={sel.stats} desc={sel.desc} proc={sel.proc} imgs={sel.imgs||[]}
          badges={<>
            <span style={{fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif",padding:"4px 12px",borderRadius:3,background:RM[sel.role].bg,color:RM[sel.role].fg}}>{RM[sel.role].l}</span>
            {sel.ai&&<span style={{fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:3,background:"rgba(196,177,240,0.2)",color:"#c4b1f0"}}>AI</span>}
            <span style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginLeft:"auto"}}>{sel.period}</span>
          </>}
        />
      )}

      {/* UNIVERSAL MODAL ─ AI DREAM SCENE LAYER */}
      {selScene && (
        <UniversalModal 
          isOpen={!!selScene} onClose={()=>setSelScene(null)} title={selScene.title} subtitle={selScene.desc} imgUrl={selScene.imgUrl}
          badges={<>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",fontWeight:700,color:"#c4b1f0"}}>ACT {selScene.act}</span>
            <span style={{color:"rgba(255,255,255,0.3)"}}>·</span>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.5)"}}>{selScene.scene}</span>
          </>}
          desc={selScene.desc}
          proc={<div style={{display:"flex",flexDirection:"column",gap:14,marginTop:12}}>
            {WORKFLOW.map((w,i)=><div key={i} style={{display:"flex",gap:16,alignItems:"flex-start"}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:"rgba(196,177,240,0.5)",paddingTop:2}}>{w.step}</span>
              <div>
                <div style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:700,color:w.color}}>{w.tool}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:300,marginTop:2}}>{w.detail}</div>
              </div>
            </div>)}
          </div>}
        />
      )}
    </div>
  </>;
}