import { useState, useEffect, useRef } from "react";

// ─── PROJECT DATA ──────────────────────────────────────────────────────────────
const P = [
  { id:"hyundai", brand:"현대카드", period:"2024", role:"lead", ai:true,
    tag:"프리미엄 금융 브랜드의 디지털 크리에이티브 총괄",
    stats:[{l:"연간 소재",v:"1,228"},{l:"CTR",v:"2×"},{l:"노출",v:"20억+"}],
    desc:"현대카드 전 카드 라인업의 디지털 광고 크리에이티브를 총괄 리딩. 브랜드 일관성을 유지하면서 카드별 차별화된 비주얼 전략을 수립하고, 하반기 CTR 2배 개선을 달성.",
    proc:"크리에이티브 방향성 수립 → 기획팀 커뮤니케이션 → 팀 내 업무 분배 → 시안 리뷰 → 성과 모니터링" },
  { id:"coupang", brand:"쿠팡풀필먼트", period:"2024–25", role:"handson", ai:true,
    tag:"데일리 카카오 플친 소재 대량 제작",
    stats:[{l:"발송",v:"Daily"},{l:"총 소재",v:"6,900+"}],
    desc:"카카오 플러스친구 채널의 데일리 프로모션 소재를 직접 기획·제작·운영. 대량 제작 환경에서 일관된 퀄리티와 효율적 워크플로우 구축.",
    proc:"프로모션 캘너 → 소재 기획 → 디자인 제작 → 검수 → 발송" },
  { id:"spirit", brand:"스피릿테일즈", period:"2024", role:"lead", ai:true,
    tag:"게임 런칭 DA 캠페인 크리에이티브 리드",
    stats:[{l:"포맷",v:"DA/BSA/KV"}],
    desc:"스피릿테일즈 게임 런칭 및 시즌별 업데이트 캠페인의 크리에이티브 방향성 수립 및 팀 리딩.",
    proc:"IP 분석 → 타깃 설정 → 컨셉 수립 → 시안 리딩 → 매체 최적화" },
  { id:"ali", brand:"알리익스프레스", period:"2024", role:"collab", ai:true,
    tag:"글로벌 이커머스 DA 캠페인",
    stats:[{l:"캠페인",v:"BSA/타임딜"}],
    desc:"알리익스프레스의 다양한 프로모션 DA 소재 기획 및 제작 협업.",
    proc:"글로벌 가이드 → 로컬라이제이션 → 소재 제작 → 매체 협업" },
  { id:"jobkorea", brand:"잡코리아", period:"2024", role:"handson", ai:false,
    tag:"채용 플랫폼 디지털 크리에이티브", stats:[],
    desc:"잡코리아 신학기 캠페인, 이상형월드컵 등 프로모션 DA 소재 직접 제작.",
    proc:"브리프 분석 → 컨셉 도출 → 디자인 → 리뷰 → 최종 산출" },
  { id:"daesang", brand:"대상웰라이프", period:"2024", role:"collab", ai:true,
    tag:"건강기능식품 디지털 마케팅",
    stats:[{l:"제품",v:"15종"}],
    desc:"뉴케어, 마이밀, 올프로틴 등 15개 제품 라인의 DA 소재 및 이벤트 페이지 제작.",
    proc:"USP 분석 → 메시지 설계 → 소재 제작 → A/B 테스트" },
  { id:"woori", brand:"우리카드", period:"2025", role:"lead", ai:false,
    tag:"금융 브랜드 크리에이티브 운영", stats:[],
    desc:"우리카드 디지털 광고 크리에이티브 운영 및 리딩.",
    proc:"브리프 → 방향성 → 팀 배분 → 리뷰 → 산출" },
  { id:"netmarble", brand:"넷마블", period:"2024", role:"lead", ai:true,
    tag:"게임 퍼포먼스 DA", stats:[],
    desc:"넷마블 게임 타이틀 퍼포먼스 마케팅 DA 크리에이티브 리딩.",
    proc:"타이틀 분석 → UA 전략 → 크리에이티브 리딩 → 최적화" },
  { id:"linegames", brand:"라인게임즈", period:"2024", role:"lead", ai:false,
    tag:"게임 브랜드 DA 크리에이티브", stats:[],
    desc:"라인게임즈 게임 타이틀 디지털 광고 크리에이티브 리딩.",
    proc:"IP 분석 → 세그먼트 → 전략 → 제작 관리 → QC" },
];

// ─── 21년의 밤 — AI 프로젝트 데이터 ──────────────────────────────────────────
const NIGHT_SCENES = [
  { id:1, act:1, scene:"Sc.01", title:"기억의 문", desc:"꿈속 첫 번째 복도. 어린 시절의 잔상들이 벽을 채운다." },
  { id:2, act:1, scene:"Sc.02", title:"잠든 도시", desc:"새벽 3시, 아무도 없는 거리. 가로등 빛이 물웅덩이에 번진다." },
  { id:3, act:1, scene:"Sc.03", title:"서랍 속", desc:"열리지 않는 서랍. 그 안에 무엇이 있는지 알면서도 열지 못한다." },
  { id:4, act:1, scene:"Sc.04", title:"첫 번째 균열", desc:"천장에서 시작된 균열이 바닥까지 내려온다. 소리 없이." },
  { id:5, act:1, scene:"Sc.05", title:"반복", desc:"같은 계단을 오르는 꿈. 몇 번째인지 세는 것을 멈췄다." },
  { id:6, act:2, scene:"Sc.06", title:"마주침", desc:"거울 속에서 눈이 마주쳤다. 내가 먼저 눈을 피했다." },
  { id:7, act:2, scene:"Sc.07", title:"수몰", desc:"물이 차오른다. 당황하지 않는 자신이 더 낯설다." },
  { id:8, act:2, scene:"Sc.08", title:"목소리", desc:"이름을 부르는 목소리. 돌아보면 항상 아무도 없다." },
  { id:9, act:2, scene:"Sc.09", title:"경계", desc:"꿈인지 현실인지 구분이 흐려지는 순간들." },
  { id:10, act:2, scene:"Sc.10", title:"21년", desc:"21년이 하나의 프레임으로 압축된다. 무게가 느껴진다." },
  { id:11, act:3, scene:"Sc.11", title:"해방", desc:"무거운 것을 내려놓는 꿈. 무엇인지는 깨어나면 잊힌다." },
  { id:12, act:3, scene:"Sc.12", title:"새벽빛", desc:"창문으로 들어오는 빛. 먼지가 빛 속에서 춤춘다." },
  { id:13, act:3, scene:"Sc.13", title:"귀환", desc:"어딘가로 돌아가는 꿈. 어디인지 알 것 같은 느낌." },
  { id:14, act:3, scene:"Sc.14", title:"눈을 뜨다", desc:"꿈의 마지막 프레임. 이것이 끝인지 시작인지." },
];

const WORKFLOW = [
  { step:"01", tool:"시나리오", detail:"꿈일기 기반 3막 14씬 스크립트", color:"rgba(196,177,240,0.9)" },
  { step:"02", tool:"Midjourney", detail:"씬별 키 비주얼 생성", color:"rgba(196,177,240,0.7)" },
  { step:"03", tool:"Nano Banana", detail:"보조 이미지 생성 · 크로스체크", color:"rgba(196,177,240,0.55)" },
  { step:"04", tool:"Higgsfield / Kling", detail:"스틸 → 모션 변환", color:"rgba(196,177,240,0.45)" },
  { step:"05", tool:"Topaz", detail:"업스케일 · 노이즈 제거", color:"rgba(196,177,240,0.35)" },
  { step:"06", tool:"Premiere", detail:"최종 편집 · 사운드 믹싱", color:"rgba(196,177,240,0.25)" },
];

const RM = {
  handson: { l:"HANDS-ON", bg:"rgba(196,177,240,0.85)", fg:"#141418" },
  lead: { l:"LEAD", bg:"rgba(255,255,255,0.85)", fg:"#141418" },
  collab: { l:"COLLAB", bg:"rgba(196,177,240,0.4)", fg:"#e8e0ff" },
};

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function Particles() {
  const pts = Array.from({length:40},(_,i)=>({
    i, x:Math.random()*100, y:Math.random()*100,
    s:Math.random()*1.5+0.5, d:Math.random()*5, du:Math.random()*4+3,
    o:Math.random()*0.35+0.05,
  }));
  return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
    {pts.map(p=><div key={p.i} style={{
      position:"absolute",left:`${p.x}%`,top:`${p.y}%`,
      width:p.s,height:p.s,borderRadius:"50%",
      background:`rgba(196,177,240,${p.o})`,
      animation:`float ${p.du}s ${p.d}s ease-in-out infinite alternate`,
    }}/>)}
  </div>;
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function Card({p,i,onClick}) {
  const [h,setH]=useState(false);
  const r=RM[p.role];
  const angles=[145,170,155,180,135,160,150,175,140];
  return <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{
      position:"relative",cursor:"pointer",overflow:"hidden",borderRadius:6,
      aspectRatio:"4/3",
      background:`linear-gradient(${angles[i%9]}deg, #1c1c24 0%, #222230 40%, #2a2535 100%)`,
      border:`1px solid ${h?"rgba(196,177,240,0.2)":"rgba(255,255,255,0.04)"}`,
      transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",
      transform:h?"translateY(-4px) scale(1.01)":"none",
      boxShadow:h?"0 16px 48px rgba(196,177,240,0.08)":"none",
      animation:`revealCard 0.5s ${i*0.06}s ease-out both`,
    }}>
    <div style={{
      position:"absolute",inset:0,
      background:h?`radial-gradient(circle at 50% 80%, rgba(196,177,240,0.06) 0%, transparent 70%)`:"none",
      transition:"all 0.4s",
    }}/>
    <div style={{
      position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-55%)",
      fontFamily:"'Playfair Display',serif",fontSize:120,fontWeight:300,
      color:"rgba(196,177,240,0.04)",lineHeight:1,userSelect:"none",
      transition:"all 0.5s",opacity:h?0.8:1,
    }}>{p.brand.charAt(0)}</div>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"24px 22px",zIndex:1}}>
      <div style={{display:"flex",gap:7,marginBottom:10,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.14em",fontFamily:"'DM Sans',sans-serif",padding:"3px 10px",borderRadius:3,background:r.bg,color:r.fg}}>{r.l}</span>
        {p.ai&&<span style={{fontSize:9,fontWeight:600,letterSpacing:"0.1em",fontFamily:"'DM Sans',sans-serif",padding:"3px 8px",borderRadius:3,background:"rgba(196,177,240,0.12)",color:"rgba(196,177,240,0.7)",border:"1px solid rgba(196,177,240,0.15)"}}>AI</span>}
        <span style={{fontSize:10,color:"rgba(255,255,255,0.25)",fontFamily:"'DM Sans',sans-serif"}}>{p.period}</span>
      </div>
      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:400,color:"rgba(255,255,255,0.88)",letterSpacing:"0.01em",lineHeight:1.2,marginBottom:6,transition:"all 0.3s",transform:h?"translateY(-2px)":"none"}}>{p.brand}</h3>
      <p style={{fontSize:12,color:"rgba(255,255,255,0.35)",lineHeight:1.5,fontFamily:"'Noto Sans KR',sans-serif",fontWeight:300,maxHeight:h?50:0,opacity:h?1:0,overflow:"hidden",transition:"all 0.35s ease"}}>{p.tag}</p>
      {p.stats.length>0&&<div style={{display:"flex",gap:16,marginTop:8,maxHeight:h?30:0,opacity:h?1:0,overflow:"hidden",transition:"all 0.35s ease 0.05s"}}>
        {p.stats.slice(0,3).map((s,j)=><div key={j} style={{display:"flex",alignItems:"baseline",gap:4}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:400,color:"rgba(196,177,240,0.8)"}}>{s.v}</span>
          <span style={{fontSize:9,color:"rgba(255,255,255,0.2)",fontFamily:"'DM Sans',sans-serif"}}>{s.l}</span>
        </div>)}
      </div>}
    </div>
  </div>;
}

// ─── 현대카드 크리에이티브 큐레이션 데이터 ────────────────────────────────────
const HYUNDAI_CURATION = {
  strategy: "프리미엄 상품 런칭부터 대중 시장 캠페인까지 전략 범위를 넓히면서도, 모든 캠페인 유형에서 현대카드 특유의 디자인 우수성을 유지하는 것이 핵심 과제였다. 브랜드 일관성과 타깃 다변화 사이의 긴장을 크리에이티브 전략으로 풀어낸 프로젝트.",
  curatedExample: {
    title: "Z-Work카드 소재 큐레이션 판단",
    status: "제외",
    reason: "만화풍 일러스트 스타일이 현대카드 프리미엄 미학과 충돌. 직관적인 메시지 전달력은 있으나 브랜드 자산을 강화하지 못하는 방향으로 판단, 리드급 포트폴리오에서 제외 결정.",
    designNote: "Z 모티프와 블루·그린 팔레트 자체는 유효했으나, 말풍선 레이아웃이 브랜드 위계를 흐림. 동일 혜택을 현대카드 비주얼 문법으로 재해석하는 방향을 대안으로 제시.",
  },
  portfolioAdvice: "전략적 사고가 드러나는 소재 — 디자인이 단순 실행을 넘어 비즈니스 문제를 해결하는 방식을 보여주는 작업에 집중. 제네릭하거나 '안전한' 디자인은 제거하고, 브랜드 규범에서 의도적으로 벗어날 때는 높은 예술적 완성도와 명확한 전략적 근거를 함께 제시.",
};

// ─── FULLSCREEN MODAL ─────────────────────────────────────────────────────────
function Modal({sel, onClose}) {
  useEffect(()=>{
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=""};
  },[]);

  if(!sel) return null;

  return <div onClick={onClose} style={{
    position:"fixed",inset:0,zIndex:200,
    background:"rgba(10,10,14,0.97)",backdropFilter:"blur(24px)",
    display:"flex",alignItems:"center",justifyContent:"center",
    animation:"fadeIn 0.2s ease-out",
    padding:"0",
  }}>
    <div onClick={e=>e.stopPropagation()} style={{
      width:"92vw",height:"92vh",maxWidth:1100,
      overflow:"auto",position:"relative",
      animation:"modalSlide 0.4s cubic-bezier(0.16,1,0.3,1)",
      background:"rgba(22,22,30,0.8)",borderRadius:12,
      border:"1px solid rgba(196,177,240,0.1)",
      backdropFilter:"blur(20px)",
      display:"flex",flexDirection:"column",
    }}>
      {/* Modal Header */}
      <div style={{
        padding:"32px 48px 24px",
        borderBottom:"1px solid rgba(255,255,255,0.04)",
        display:"flex",justifyContent:"space-between",alignItems:"flex-start",
        flexShrink:0,
      }}>
        <div>
          <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",fontFamily:"'DM Sans',sans-serif",padding:"4px 14px",borderRadius:3,background:RM[sel.role].bg,color:RM[sel.role].fg}}>{RM[sel.role].l}</span>
            {sel.ai&&<span style={{fontSize:10,letterSpacing:"0.1em",fontFamily:"'DM Sans',sans-serif",fontWeight:600,padding:"4px 12px",borderRadius:3,background:"rgba(196,177,240,0.15)",color:"rgba(196,177,240,0.7)",border:"1px solid rgba(196,177,240,0.12)"}}>AI</span>}
            <span style={{fontSize:11,color:"rgba(255,255,255,0.2)",fontFamily:"'DM Sans',sans-serif"}}>{sel.period}</span>
          </div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,42px)",fontWeight:300,color:"rgba(255,255,255,0.9)",letterSpacing:"0.02em",lineHeight:1.1,marginBottom:6}}>{sel.brand}</h2>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.28)",fontWeight:300,fontFamily:"'Noto Sans KR',sans-serif"}}>{sel.tag}</p>
        </div>
        <button onClick={onClose} style={{
          background:"none",border:"1px solid rgba(255,255,255,0.08)",
          cursor:"pointer",color:"rgba(255,255,255,0.3)",
          width:40,height:40,borderRadius:6,
          fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:300,
          display:"flex",alignItems:"center",justifyContent:"center",
          transition:"all 0.2s",flexShrink:0,marginLeft:24,
        }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,177,240,0.3)";e.currentTarget.style.color="rgba(196,177,240,0.8)"}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.color="rgba(255,255,255,0.3)"}}>×</button>
      </div>

      {/* Modal Body */}
      <div style={{padding:"36px 48px",overflow:"auto",flexGrow:1}}>
        {/* Stats */}
        {sel.stats.length>0&&<div style={{display:"flex",gap:40,padding:"20px 0",marginBottom:36,borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
          {sel.stats.map((s,i)=><div key={i}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:300,color:"rgba(196,177,240,0.8)"}}>{s.v}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.2)",fontFamily:"'DM Sans',sans-serif",fontWeight:500,letterSpacing:"0.12em",marginTop:4}}>{s.l}</div>
          </div>)}
        </div>}

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,marginBottom:40}}>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.2em",color:"rgba(196,177,240,0.5)",fontWeight:600,marginBottom:12}}>OVERVIEW</p>
            <p style={{fontSize:15,lineHeight:1.9,color:"rgba(255,255,255,0.5)",fontWeight:300,fontFamily:"'Noto Sans KR',sans-serif"}}>{sel.desc}</p>
          </div>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.2em",color:"rgba(196,177,240,0.5)",fontWeight:600,marginBottom:12}}>PROCESS</p>
            <p style={{fontSize:14,lineHeight:2,color:"rgba(255,255,255,0.35)",fontWeight:300,fontFamily:"'Noto Sans KR',sans-serif"}}>{sel.proc}</p>
          </div>
        </div>

        {/* 현대카드 전용: 크리에이티브 큐레이션 케이스스터디 */}
        {sel.id==="hyundai" && <div style={{marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.2em",color:"rgba(196,177,240,0.5)",fontWeight:600}}>CREATIVE DIRECTION</p>
            <div style={{flexGrow:1,height:1,background:"rgba(255,255,255,0.04)"}}/>
          </div>

          {/* 전략 개요 */}
          <div style={{
            padding:"24px 28px",borderRadius:8,marginBottom:16,
            background:"rgba(196,177,240,0.03)",
            border:"1px solid rgba(196,177,240,0.08)",
          }}>
            <p style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.18em",fontWeight:600,color:"rgba(196,177,240,0.4)",marginBottom:10}}>STRATEGY OVERVIEW</p>
            <p style={{fontSize:13,lineHeight:1.9,color:"rgba(255,255,255,0.4)",fontWeight:300,fontFamily:"'Noto Sans KR',sans-serif"}}>{HYUNDAI_CURATION.strategy}</p>
          </div>

          {/* 큐레이션 판단 케이스 */}
          <div style={{
            padding:"24px 28px",borderRadius:8,marginBottom:16,
            background:"rgba(255,255,255,0.015)",
            border:"1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <p style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.18em",fontWeight:600,color:"rgba(196,177,240,0.4)"}}>CURATION CASE</p>
              <span style={{
                padding:"2px 10px",borderRadius:3,fontSize:9,fontWeight:700,
                fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.1em",
                background:"rgba(255,100,100,0.1)",color:"rgba(255,130,130,0.6)",
                border:"1px solid rgba(255,100,100,0.12)",
              }}>{HYUNDAI_CURATION.curatedExample.status}</span>
            </div>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:400,color:"rgba(255,255,255,0.65)",marginBottom:12,fontStyle:"italic"}}>{HYUNDAI_CURATION.curatedExample.title}</p>
            <p style={{fontSize:13,lineHeight:1.85,color:"rgba(255,255,255,0.35)",fontWeight:300,fontFamily:"'Noto Sans KR',sans-serif",marginBottom:14}}>{HYUNDAI_CURATION.curatedExample.reason}</p>
            <div style={{paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.04)"}}>
              <p style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.15em",fontWeight:600,color:"rgba(196,177,240,0.3)",marginBottom:8}}>DESIGN NOTE</p>
              <p style={{fontSize:12,lineHeight:1.8,color:"rgba(255,255,255,0.25)",fontWeight:300,fontFamily:"'Noto Sans KR',sans-serif"}}>{HYUNDAI_CURATION.curatedExample.designNote}</p>
            </div>
          </div>

          {/* 포트폴리오 방향성 */}
          <div style={{
            padding:"20px 28px",borderRadius:8,
            background:"linear-gradient(135deg,rgba(196,177,240,0.04) 0%,rgba(196,177,240,0.01) 100%)",
            border:"1px solid rgba(196,177,240,0.07)",
          }}>
            <p style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.18em",fontWeight:600,color:"rgba(196,177,240,0.4)",marginBottom:10}}>PORTFOLIO PRINCIPLE</p>
            <p style={{fontSize:13,lineHeight:1.85,color:"rgba(255,255,255,0.35)",fontWeight:300,fontFamily:"'Noto Sans KR',sans-serif",fontStyle:"italic"}}>{HYUNDAI_CURATION.portfolioAdvice}</p>
          </div>
        </div>}

        {/* Image area placeholder */}
        <div style={{
          borderRadius:8,padding:"72px 32px",textAlign:"center",
          border:"1px dashed rgba(196,177,240,0.1)",
          background:"rgba(196,177,240,0.015)",
        }}>
          <p style={{fontSize:13,color:"rgba(196,177,240,0.2)",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.12em",marginBottom:8}}>VISUAL ASSETS</p>
          <p style={{fontSize:11,color:"rgba(255,255,255,0.12)",fontFamily:"'Noto Sans KR',sans-serif",fontWeight:300}}>소재 이미지 추가 예정</p>
        </div>
      </div>
    </div>
  </div>;
}

// ─── 21년의 밤 SCENE CARD ────────────────────────────────────────────────────
function SceneCard({scene, onClick, imgUrl}) {
  const [h,setH]=useState(false);
  const actColors={1:"rgba(196,177,240,0.7)",2:"rgba(180,160,240,0.55)",3:"rgba(160,140,230,0.4)"};
  return <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{
      cursor:"pointer",borderRadius:6,overflow:"hidden",
      aspectRatio:"3/4",position:"relative",
      background:`linear-gradient(160deg, #1a1820 0%, #211e2e 100%)`,
      border:`1px solid ${h?"rgba(196,177,240,0.22)":"rgba(255,255,255,0.04)"}`,
      transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",
      transform:h?"translateY(-6px)":"none",
      boxShadow:h?"0 20px 60px rgba(100,80,160,0.15)":"none",
      animation:`revealCard 0.5s ${(scene.id%7)*0.05}s ease-out both`,
    }}>
    {/* Dream texture background */}
    <div style={{
      position:"absolute",inset:0,
      background:`
        radial-gradient(ellipse at 30% 20%, rgba(196,177,240,0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 80%, rgba(120,100,200,0.06) 0%, transparent 50%)
      `,
      transition:"opacity 0.4s",
      opacity:h?1.5:1,
    }}/>

    {/* Image placeholder / actual image */}
    {imgUrl
      ? <img src={imgUrl} alt={scene.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:h?0.9:0.7,transition:"opacity 0.4s"}}/>
      : <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:64,fontWeight:300,color:"rgba(196,177,240,0.04)",letterSpacing:"-0.02em"}}>{scene.id.toString().padStart(2,"0")}</span>
        </div>
    }

    {/* Content overlay */}
    <div style={{
      position:"absolute",inset:0,
      background:`linear-gradient(to top, rgba(14,12,22,0.95) 0%, rgba(14,12,22,0.4) 50%, transparent 100%)`,
      display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"20px 18px",zIndex:1,
    }}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.15em",fontWeight:600,color:actColors[scene.act]}}>ACT {scene.act}</span>
        <span style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.1em",color:"rgba(255,255,255,0.2)"}}>{scene.scene}</span>
      </div>
      <h4 style={{
        fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:400,
        color:"rgba(255,255,255,0.85)",marginBottom:6,lineHeight:1.3,
        fontStyle:"italic",
      }}>{scene.title}</h4>
      <p style={{
        fontSize:11,color:"rgba(255,255,255,0.3)",lineHeight:1.6,fontWeight:300,
        fontFamily:"'Noto Sans KR',sans-serif",
        maxHeight:h?60:0,opacity:h?1:0,overflow:"hidden",transition:"all 0.35s ease",
      }}>{scene.desc}</p>
    </div>
  </div>;
}

// ─── SCENE MODAL (16:9 CINEMATIC RE-DESIGN) ───────────────────────────────────
function SceneModal({scene, onClose}) {
  useEffect(()=>{
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=""};
  },[]);

  if(!scene) return null;
  const actColors={1:"rgba(196,177,240,0.9)",2:"rgba(180,160,240,0.7)",3:"rgba(160,140,230,0.55)"};

  return <div onClick={onClose} style={{
    position:"fixed",inset:0,zIndex:300,
    background:"rgba(6,5,8,0.98)",backdropFilter:"blur(24px)",
    display:"flex",alignItems:"center",justifyContent:"center",
    animation:"fadeIn 0.2s ease-out",padding:20,
  }}>
    <div onClick={e=>e.stopPropagation()} style={{
      width:"94vw",height:"92vh",maxWidth:850,
      animation:"modalSlide 0.4s cubic-bezier(0.16,1,0.3,1)",
      background:"rgba(18,16,24,0.95)",borderRadius:14,
      border:"1px solid rgba(196,177,240,0.08)",
      backdropFilter:"blur(20px)",
      display:"flex",flexDirection:"column",overflow:"hidden",
    }}>
      {/* 1. Top Cinematic Header (Floating Close) */}
      <div style={{
        padding:"24px 32px 16px",
        display:"flex",justifyContent:"space-between",alignItems:"center",
        flexShrink:0,background:"rgba(14,12,18,0.4)",
        borderBottom:"1px solid rgba(255,255,255,0.03)"
      }}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.2em",fontWeight:600,color:actColors[scene.act]}}>ACT {scene.act}</span>
          <span style={{color:"rgba(255,255,255,0.1)"}}>·</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.1em",color:"rgba(255,255,255,0.25)"}}>{scene.scene}</span>
        </div>
        <button onClick={onClose} style={{
          background:"none",border:"1px solid rgba(255,255,255,0.06)",cursor:"pointer",
          color:"rgba(255,255,255,0.3)",width:32,height:32,borderRadius:6,fontSize:16,
          display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"
        }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,177,240,0.3)";e.currentTarget.style.color="rgba(196,177,240,0.8)"}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,255,255,0.3)"}}>×</button>
      </div>

      {/* 2. Scrollable Container */}
      <div style={{flexGrow:1,overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection:"column"}}>
        
        {/* 16:9 Wide Cinematic Visual Area */}
        <div style={{
          width:"100%",aspectRatio:"16/9",background:"#0a090f",
          display:"flex",alignItems:"center",justifyContent:"center",
          position:"relative",flexShrink:0,
          borderBottom:"1px solid rgba(196,177,240,0.05)",
          boxShadow:"inset 0 20px 40px rgba(0,0,0,0.8)"
        }}>
          {/* Subtle vignette gradient for artistic atmosphere */}
          <div style={{
            position:"absolute",inset:0,pointerEvents:"none",
            background:"linear-gradient(to bottom, transparent 70%, rgba(18,16,24,0.5) 100%)",
            zIndex:1
          }}/>
          
          <div style={{textAlign:"center", zIndex:2, padding:20}}>
            <div style={{
              fontSize:56,fontFamily:"'Playfair Display',serif",fontWeight:300,
              color:"rgba(196,177,240,0.04)",letterSpacing:"-0.03em",lineHeight:1,marginBottom:4
            }}>{scene.id.toString().padStart(2,"0")}</div>
            <p style={{fontSize:9,color:"rgba(196,177,240,0.25)",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.2em",fontWeight:500}}>CINEMATIC ASSET PENDING</p>
            <p style={{fontSize:11,color:"rgba(255,255,255,0.15)",fontFamily:"'Noto Sans KR',sans-serif",fontWeight:200,marginTop:6}}>Midjourney / Kling 시네마틱 영상 적용 영역</p>
          </div>
        </div>

        {/* Info & Workflow Split Layout below Image */}
        <div style={{padding:"36px 40px 48px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48}}>
          
          {/* Left Column: Scene Text Info */}
          <div>
            <h2 style={{
              fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:300,
              color:"rgba(255,255,255,0.9)",fontStyle:"italic",letterSpacing:"0.01em",
              lineHeight:1.25,marginBottom:12
            }}>{scene.title}</h2>
            <p style={{
              fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.85,
              fontFamily:"'Noto Sans KR',sans-serif",fontWeight:300
            }}>{scene.desc}</p>
          </div>

          {/* Right Column: AI Workflow Flow */}
          <div style={{
            borderLeft:"1px solid rgba(255,255,255,0.04)", paddingLeft:32
          }}>
            <p style={{
              fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.18em",
              color:"rgba(196,177,240,0.5)",fontWeight:600,marginBottom:18
            }}>AI PRODUCTION PIPELINE</p>
            
            <div style={{display:"flex", flexDirection:"column", gap:14}}>
              {WORKFLOW.map((w,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <span style={{
                  fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:600,
                  color:"rgba(196,177,240,0.25)",letterSpacing:"0.05em",paddingTop:2,flexShrink:0
                }}>{w.step}</span>
                <div>
                  <div style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:w.color}}>{w.tool}</div>
                  <div style={{
                    fontSize:11,color:"rgba(255,255,255,0.25)",fontFamily:"'Noto Sans KR',sans-serif",
                    fontWeight:300,marginTop:2,lineHeight:1.4
                  }}>{w.detail}</div>
                </div>
              </div>)}
            </div>
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
  const [activeSection, setActiveSection] = useState("work");
  const gRef = useRef(null);
  const nightRef = useRef(null);

  useEffect(()=>{
    const h=()=>setSy(window.scrollY);
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[]);

  const list = fil==="all" ? P : P.filter(p=>p.role===fil);

  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@200;300;400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{background:#141418;overflow-x:hidden}
      ::selection{background:rgba(196,177,240,0.35);color:#fff}
      ::-webkit-scrollbar{width:3px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:rgba(196,177,240,0.2);border-radius:2px}
      @keyframes revealCard{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes modalSlide{from{opacity:0;transform:translateY(32px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes float{from{transform:translateY(0)}to{transform:translateY(-8px)}}
      @keyframes drift{0%{opacity:0;transform:translateY(50px)}100%{opacity:1;transform:translateY(0)}}
      @keyframes pulse{0%,100%{opacity:0.3}50%{opacity:0.7}}
      @keyframes nightPulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:0.7;transform:scale(1.02)}}
      .nl{transition:all 0.3s;cursor:pointer;color:rgba(255,255,255,0.4)}
      .nl:hover{color:rgba(196,177,240,0.9)}
      .fp{transition:all 0.3s;cursor:pointer}
      .fp:hover{background:rgba(196,177,240,0.08)!important}
    `}</style>

    <div style={{fontFamily:"'Noto Sans KR',sans-serif",color:"#fff",position:"relative",minHeight:"100vh"}}>
      <Particles/>
      
      {/* Ambient glow */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
        background:`
          radial-gradient(ellipse 80% 50% at 20% 80%, rgba(196,177,240,0.03) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 20%, rgba(196,177,240,0.02) 0%, transparent 50%)
        `
      }}/>

      {/* NAV */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:50,
        padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",
        background:sy>80?"rgba(20,20,24,0.92)":"transparent",
        backdropFilter:sy>80?"blur(20px)":"none",
        borderBottom:sy>80?"1px solid rgba(196,177,240,0.06)":"none",
        transition:"all 0.4s",
      }}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:300,letterSpacing:"0.12em",color:"rgba(255,255,255,0.7)"}}>
          FROM.<span style={{fontWeight:500,fontStyle:"italic",color:"rgba(196,177,240,0.9)"}}>S</span>
        </div>
        <div style={{display:"flex",gap:28,fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:500,letterSpacing:"0.08em"}}>
          <span className="nl" onClick={()=>gRef.current?.scrollIntoView({behavior:"smooth"})}>WORK</span>
          <span className="nl" onClick={()=>nightRef.current?.scrollIntoView({behavior:"smooth"})} style={{color:"rgba(196,177,240,0.55)"}}>21년의 밤</span>
          <span className="nl" onClick={()=>document.getElementById("proc")?.scrollIntoView({behavior:"smooth"})}>PROCESS</span>
          <a href="mailto:pilotfish89@gmail.com" className="nl" style={{textDecoration:"none",color:"inherit"}}>CONTACT</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight:"100vh",display:"flex",flexDirection:"column",
        justifyContent:"center",alignItems:"center",position:"relative",zIndex:1,
        textAlign:"center",
        opacity:Math.max(0,1-sy/500),transform:`translateY(${sy*0.12}px)`,
      }}>
        <div style={{animation:"drift 1s ease-out both"}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.35em",color:"rgba(196,177,240,0.5)",fontWeight:500,marginBottom:28}}>DESIGN PORTFOLIO</p>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(52px,9vw,110px)",fontWeight:300,letterSpacing:"0.06em",lineHeight:0.95,marginBottom:12}}>
            <span style={{color:"rgba(255,255,255,0.85)"}}>FROM.</span>
            <span style={{fontStyle:"italic",fontWeight:400,color:"rgba(196,177,240,0.9)"}}>S</span>
          </h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:"0.18em",color:"rgba(255,255,255,0.22)",fontWeight:400,marginBottom:56}}>이슬비 — Creative Lead & Designer</p>
          <div style={{display:"flex",gap:56,justifyContent:"center",animation:"drift 1s 0.2s ease-out both"}}>
            {[{n:"10+",l:"YEARS"},{n:"1,228",l:"CREATIVES"},{n:"2×",l:"CTR LIFT"}].map((s,i)=>(
              <div key={i}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:300,color:"rgba(255,255,255,0.65)",letterSpacing:"0.03em"}}>{s.n}</div>
                <div style={{fontSize:9,letterSpacing:"0.2em",color:"rgba(196,177,240,0.35)",fontFamily:"'DM Sans',sans-serif",fontWeight:500,marginTop:6}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",animation:"pulse 3s ease-in-out infinite"}}>
          <div style={{width:1,height:36,background:"linear-gradient(to bottom,rgba(196,177,240,0.3),transparent)"}}/>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={gRef} style={{position:"relative",zIndex:1,padding:"48px 40px 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:16}}>
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.3em",color:"rgba(196,177,240,0.45)",fontWeight:600,marginBottom:8}}>SELECTED WORK</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:300,color:"rgba(255,255,255,0.8)",letterSpacing:"0.04em"}}>Projects</h2>
          </div>
          <div style={{display:"flex",gap:6}}>
            {[{id:"all",l:"ALL"},{id:"handson",l:"HANDS-ON"},{id:"lead",l:"LEAD"},{id:"collab",l:"COLLAB"}].map(f=>(
              <button key={f.id} className="fp" onClick={()=>setFil(f.id)} style={{
                padding:"6px 16px",borderRadius:4,fontSize:10,letterSpacing:"0.12em",
                fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",
                border:`1px solid ${fil===f.id?"rgba(196,177,240,0.35)":"rgba(255,255,255,0.06)"}`,
                background:fil===f.id?"rgba(196,177,240,0.1)":"transparent",
                color:fil===f.id?"rgba(196,177,240,0.9)":"rgba(255,255,255,0.3)",
              }}>{f.l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {list.map((p,i)=><Card key={p.id} p={p} i={i} onClick={()=>setSel(p)}/>)}
        </div>
      </section>

      {/* ─── 21년의 밤 SHOWCASE ─── */}
      <section ref={nightRef} style={{
        position:"relative",zIndex:1,
        padding:"80px 40px 100px",
        overflow:"hidden",
      }}>
        {/* Section glow bg */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          background:`
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(100,80,180,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 70% 40% at 0% 100%, rgba(196,177,240,0.04) 0%, transparent 50%)
          `,
        }}/>

        <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
          {/* Header */}
          <div style={{marginBottom:56}}>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.3em",color:"rgba(196,177,240,0.45)",fontWeight:600}}>AI FILM PROJECT</p>
              <span style={{
                padding:"3px 12px",borderRadius:3,fontSize:9,fontWeight:700,letterSpacing:"0.12em",
                fontFamily:"'DM Sans',sans-serif",
                background:"rgba(196,177,240,0.12)",color:"rgba(196,177,240,0.6)",
                border:"1px solid rgba(196,177,240,0.18)",
              }}>진행 중</span>
            </div>
            <h2 style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(36px,5vw,72px)",fontWeight:300,
              color:"rgba(255,255,255,0.88)",letterSpacing:"0.04em",
              lineHeight:1.05,marginBottom:16,fontStyle:"italic",
            }}>21년의 밤</h2>
            <p style={{
              fontSize:15,color:"rgba(255,255,255,0.35)",lineHeight:1.85,
              fontFamily:"'Noto Sans KR',sans-serif",fontWeight:300,
              maxWidth:600,
            }}>꿈일기를 원천으로 한 AI 단편 영상 프로젝트. 21년의 기억을 3막 14씬으로 재구성하고, 생성형 AI 워크플로우로 시각화하는 진행 중 케이스스터디.</p>

            {/* Meta stats */}
            <div style={{display:"flex",gap:32,marginTop:28,flexWrap:"wrap"}}>
              {[{v:"3",l:"ACTS"},{v:"14",l:"SCENES"},{v:"6",l:"AI TOOLS"},{v:"진행 중",l:"STATUS"}].map((s,i)=>(
                <div key={i} style={{display:"flex",flexDirection:"column",gap:4}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:300,color:"rgba(196,177,240,0.75)"}}>{s.v}</span>
                  <span style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,letterSpacing:"0.15em",color:"rgba(255,255,255,0.18)"}}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow pipeline */}
          <div style={{marginBottom:64,padding:"28px 32px",borderRadius:8,background:"rgba(196,177,240,0.02)",border:"1px solid rgba(196,177,240,0.07)"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.22em",color:"rgba(196,177,240,0.4)",fontWeight:600,marginBottom:20}}>AI WORKFLOW PIPELINE</p>
            <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:0}}>
              {WORKFLOW.map((w,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center"}}>
                  <div style={{
                    padding:"10px 18px",borderRadius:5,
                    background:"rgba(255,255,255,0.02)",
                    border:`1px solid ${w.color.replace("0.","0.0")}`,
                    borderColor:`rgba(196,177,240,${0.05+i*0.01})`,
                  }}>
                    <div style={{fontSize:8,fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:"0.1em",color:"rgba(196,177,240,0.35)",marginBottom:3}}>{w.step}</div>
                    <div style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:w.color,whiteSpace:"nowrap"}}>{w.tool}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.2)",fontFamily:"'Noto Sans KR',sans-serif",fontWeight:300,marginTop:2,whiteSpace:"nowrap"}}>{w.detail}</div>
                  </div>
                  {i<WORKFLOW.length-1&&<div style={{width:20,height:1,background:"rgba(196,177,240,0.12)",flexShrink:0,marginLeft:-1}}/>}
                </div>
              ))}
            </div>
          </div>

          {/* Act labels + Scene grid */}
          {[1,2,3].map(act=>{
            const actScenes = NIGHT_SCENES.filter(s=>s.act===act);
            const actTitles={1:"기억의 시작",2:"균열과 침잠",3:"귀환과 각성"};
            return <div key={act} style={{marginBottom:52}}>
              <div style={{display:"flex",alignItems:"baseline",gap:16,marginBottom:24}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:300,color:"rgba(196,177,240,0.6)",fontStyle:"italic"}}>Act {act}</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:300,color:"rgba(255,255,255,0.55)",letterSpacing:"0.03em"}}>{actTitles[act]}</span>
                <div style={{flexGrow:1,height:1,background:"rgba(255,255,255,0.04)"}}/>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.15)",fontFamily:"'DM Sans',sans-serif"}}>{actScenes.length} scenes</span>
              </div>
              <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",
                gap:12,
              }}>
                {actScenes.map(scene=><SceneCard key={scene.id} scene={scene} onClick={()=>setSelScene(scene)}/>)}
              </div>
            </div>;
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section id="proc" style={{position:"relative",zIndex:1,padding:"80px 40px",maxWidth:1200,margin:"0 auto"}}>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.3em",color:"rgba(196,177,240,0.45)",fontWeight:600,marginBottom:8}}>HOW I WORK</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:300,color:"rgba(255,255,255,0.8)",letterSpacing:"0.04em",marginBottom:44}}>Process</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
          {[
            {n:"01",t:"전략 수립",d:"브랜드 분석과 KPI 기반의 크리에이티브 방향성 도출"},
            {n:"02",t:"컨셉 기획",d:"메시지 설계, 비주얼 컨셉, AI 활용 프로토타이핑"},
            {n:"03",t:"제작 · 리딩",d:"핸즈온 디자인 또는 팀 디렉팅과 품질 관리"},
            {n:"04",t:"성과 최적화",d:"데이터 기반 소재 개선, A/B 테스트, CTR 모니터링"},
          ].map((s,i)=>(
            <div key={i} style={{padding:"28px 24px",borderRadius:6,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",transition:"all 0.3s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,177,240,0.12)";e.currentTarget.style.background="rgba(196,177,240,0.03)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.04)";e.currentTarget.style.background="rgba(255,255,255,0.02)"}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:300,color:"rgba(196,177,240,0.1)",lineHeight:1}}>{s.n}</span>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:400,color:"rgba(255,255,255,0.7)",marginTop:12,marginBottom:8,letterSpacing:"0.02em"}}>{s.t}</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,0.3)",lineHeight:1.7,fontWeight:300}}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{marginTop:28,padding:"28px 32px",borderRadius:6,background:"linear-gradient(135deg,rgba(196,177,240,0.04) 0%,rgba(196,177,240,0.01) 100%)",border:"1px solid rgba(196,177,240,0.08)"}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.2em",color:"rgba(196,177,240,0.55)",fontWeight:600,marginBottom:12}}>AI-ENHANCED WORKFLOW</p>
          <p style={{fontSize:14,lineHeight:1.85,color:"rgba(255,255,255,0.4)",fontWeight:300}}>
            생성형 AI를 크리에이티브 프로세스에 통합하여 리소스 효율화, 컨셉 프로토타이핑, 비주얼 실험을 수행합니다.
          </p>
          <div style={{display:"flex",gap:8,marginTop:16,flexWrap:"wrap"}}>
            {["Midjourney","Nano Banana","Higgsfield","Kling","Topaz","Google AI Studio","Claude","ComfyUI"].map(t=>(
              <span key={t} style={{padding:"5px 14px",fontSize:10,letterSpacing:"0.08em",fontFamily:"'DM Sans',sans-serif",fontWeight:500,borderRadius:4,border:"1px solid rgba(196,177,240,0.12)",color:"rgba(196,177,240,0.5)"}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{position:"relative",zIndex:1,padding:"80px 40px 100px",textAlign:"center",maxWidth:1200,margin:"0 auto"}}>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.3em",color:"rgba(196,177,240,0.45)",fontWeight:600,marginBottom:8}}>GET IN TOUCH</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:300,color:"rgba(255,255,255,0.8)",marginBottom:12}}>Contact</h2>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.25)",marginBottom:32,fontWeight:300}}>새로운 기회에 대한 이야기를 나누고 싶습니다.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <a href="mailto:pilotfish89@gmail.com" style={{padding:"11px 32px",borderRadius:4,textDecoration:"none",fontSize:11,letterSpacing:"0.12em",fontFamily:"'DM Sans',sans-serif",fontWeight:600,border:"1px solid rgba(196,177,240,0.35)",color:"rgba(196,177,240,0.85)",transition:"all 0.3s",background:"transparent"}}>EMAIL</a>
          <a href="https://linkedin.com" target="_blank" style={{padding:"11px 32px",borderRadius:4,textDecoration:"none",fontSize:11,letterSpacing:"0.12em",fontFamily:"'DM Sans',sans-serif",fontWeight:600,border:"1px solid rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.35)",transition:"all 0.3s",background:"transparent"}}>LINKEDIN</a>
        </div>
      </section>

      <footer style={{position:"relative",zIndex:1,padding:"20px 40px",textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.03)"}}>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.12em",color:"rgba(255,255,255,0.12)"}}>© 2026 FROM.S — Seulbi Lee</p>
      </footer>

      {/* PROJECT MODAL (fullscreen) */}
      {sel && <Modal sel={sel} onClose={()=>setSel(null)}/>}

      {/* SCENE MODAL (fullscreen) */}
      {selScene && <SceneModal scene={selScene} onClose={()=>setSelScene(null)}/>}
    </div>
  </>;
}