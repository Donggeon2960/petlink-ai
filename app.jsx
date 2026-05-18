// PetLink AI — 보호자 앱 프로토타입
// Original design — dark + neon lime accent

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────
const T = {
  bg: '#0A0A0A',
  card: '#161616',
  cardHi: '#1F1F1F',
  border: 'rgba(255,255,255,0.06)',
  borderHi: 'rgba(255,255,255,0.1)',
  accent: '#C5F048',
  accentDim: 'rgba(197,240,72,0.12)',
  accentText: '#0A0A0A',
  white: '#FFFFFF',
  gray: '#8A8A8A',
  grayDim: '#5A5A5A',
};

const KR_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro KR", "SF Pro Text", "Apple SD Gothic Neo", "Pretendard", system-ui, sans-serif';

// ─────────────────────────────────────────────────────────────
// Tiny reusable bits
// ─────────────────────────────────────────────────────────────
function Badge({ children, color = T.accent, bg = T.accentDim, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, fontWeight: 600, letterSpacing: -0.1,
      color, background: bg, padding: '4px 8px', borderRadius: 999,
      ...style,
    }}>{children}</span>
  );
}

function Card({ children, style = {}, onClick, elevated = false }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: elevated ? T.cardHi : T.card,
        borderRadius: 20,
        border: `1px solid ${T.border}`,
        padding: 18,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 120ms ease, background 120ms ease',
        ...style,
      }}
      onMouseDown={(e) => { if (onClick) e.currentTarget.style.transform = 'scale(0.985)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = ''; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
    >{children}</div>
  );
}

function SectionTitle({ children, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 4px', marginBottom: 10,
    }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: 0, letterSpacing: -0.2 }}>
        {children}
      </h3>
      {action && (
        <button style={{
          background: 'transparent', border: 'none', color: T.gray,
          fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 2,
          padding: 0, cursor: 'pointer',
        }}>
          {action}<IconChevronRight size={14} stroke={2.5} />
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pet avatar (emoji-based, neon ring)
// ─────────────────────────────────────────────────────────────
function PetAvatar({ size = 56, emoji = '🐕' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
      border: `2px solid ${T.accent}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.55, flexShrink: 0,
      boxShadow: `0 0 0 4px rgba(197,240,72,0.08)`,
    }}>{emoji}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────────────────────────
function HomeScreen({ goto }) {
  return (
    <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Greeting */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: 8 }}>
        <div>
          <div style={{ color: T.gray, fontSize: 14, fontWeight: 500, marginBottom: 4 }}>안녕하세요,</div>
          <div style={{ color: T.white, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
            김지영님 <span style={{ fontSize: 24 }}>🐶</span>
          </div>
        </div>
        <button style={{
          width: 42, height: 42, borderRadius: 999,
          background: T.card, border: `1px solid ${T.border}`,
          color: T.white, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', cursor: 'pointer',
        }}>
          <IconBell size={20} stroke={1.8} />
          <span style={{
            position: 'absolute', top: 9, right: 11, width: 8, height: 8,
            borderRadius: 999, background: T.accent, border: `2px solid ${T.card}`,
          }} />
        </button>
      </div>

      {/* Pet profile card */}
      <Card style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <PetAvatar size={64} emoji="🐕" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ color: T.white, fontSize: 19, fontWeight: 700, letterSpacing: -0.3 }}>루이</span>
              <Badge>
                <IconCheck size={10} stroke={3} /> RFID 등록 완료
              </Badge>
            </div>
            <div style={{ color: T.gray, fontSize: 13, fontWeight: 500 }}>
              골든리트리버 · 수컷 · 만 4살
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <IconChip size={12} stroke={1.8} style={{ color: T.gray }} />
              <span style={{ color: T.grayDim, fontSize: 11, fontFamily: 'ui-monospace, monospace', letterSpacing: 0.3 }}>
                410-0021-8847-3392
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly claim summary — hero stat */}
      <Card style={{
        padding: 22,
        background: `linear-gradient(155deg, #1a2010 0%, ${T.card} 60%)`,
        border: `1px solid rgba(197,240,72,0.18)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <IconSparkles size={14} stroke={2} style={{ color: T.accent }} />
          <span style={{ color: T.accent, fontSize: 12, fontWeight: 600, letterSpacing: 0.2 }}>
            이번 달 자동 청구된 보험금
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 14 }}>
          <span style={{ color: T.white, fontSize: 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
            124,000
          </span>
          <span style={{ color: T.white, fontSize: 18, fontWeight: 600 }}>원</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 14, borderTop: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: T.gray, fontSize: 12, fontWeight: 500 }}>자동 청구</span>
            <span style={{ color: T.white, fontSize: 13, fontWeight: 700 }}>3건</span>
          </div>
          <button
            onClick={() => goto('insurance')}
            style={{
              background: 'transparent', border: 'none', color: T.accent,
              fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2,
              padding: 0, cursor: 'pointer',
            }}
          >
            상세 보기 <IconChevronRight size={13} stroke={2.5} />
          </button>
        </div>
      </Card>

      {/* Next schedule */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: T.accentDim, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.accent, flexShrink: 0,
          }}>
            <IconCalendar size={22} stroke={1.8} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: T.gray, fontSize: 11, fontWeight: 600, letterSpacing: 0.2, marginBottom: 2 }}>
              다음 일정 · 27일 후
            </div>
            <div style={{ color: T.white, fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>
              12월 15일 · 심장사상충 예방
            </div>
          </div>
          <IconChevronRight size={18} stroke={2} style={{ color: T.grayDim }} />
        </div>
      </Card>

      {/* Quick access grid */}
      <div>
        <SectionTitle>빠른 액세스</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: <IconActivity size={20} stroke={1.8} />, label: '의료 이력', sub: '11건', goto: 'medical' },
            { icon: <IconReceipt size={20} stroke={1.8} />, label: '청구 내역', sub: '3건', goto: 'insurance' },
            { icon: <IconSyringe size={20} stroke={1.8} />, label: '예방접종 일정', sub: '다음 27일' },
            { icon: <IconUsers size={20} stroke={1.8} />, label: '가족 공유', sub: '2명 연결' },
          ].map((it, i) => (
            <Card key={i} onClick={() => it.goto && goto(it.goto)} style={{ padding: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(255,255,255,0.04)', color: T.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
              }}>{it.icon}</div>
              <div style={{ color: T.white, fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}>{it.label}</div>
              <div style={{ color: T.gray, fontSize: 11, fontWeight: 500, marginTop: 2 }}>{it.sub}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MEDICAL HISTORY SCREEN
// ─────────────────────────────────────────────────────────────
const MEDICAL_RECORDS = [
  { date: '2026.05.10', hospital: '한사랑 동물병원', type: '예방접종', code: 'KCD-PET-021', dx: '종합 백신 (DHPPL) 5차', cost: 40000, icon: <IconSyringe size={18} stroke={1.8} /> },
  { date: '2026.03.15', hospital: '강남펫메디컬', type: '영상의학', code: 'KCD-PET-115', dx: '슬개골 X-ray · 정상 소견', cost: 120000, icon: <IconActivity size={18} stroke={1.8} /> },
  { date: '2025.12.02', hospital: '한사랑 동물병원', type: '예방', code: 'KCD-PET-008', dx: '심장사상충 예방 (Heartgard)', cost: 28000, icon: <IconHeart size={18} stroke={1.8} /> },
  { date: '2025.09.20', hospital: '우리동물병원', type: '검사', code: 'KCD-PET-203', dx: '알러지 검사 · 페니실린 양성', cost: 85000, icon: <IconAlert size={18} stroke={1.8} /> },
  { date: '2025.07.05', hospital: '강남펫메디컬', type: '건강검진', code: 'KCD-PET-100', dx: '종합 건강검진 · 양호', cost: 220000, icon: <IconStethoscope size={18} stroke={1.8} /> },
];

function MedicalScreen() {
  return (
    <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ paddingTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ color: T.gray, fontSize: 13, fontWeight: 500 }}>의료 이력</span>
          <Badge color={T.white} bg="rgba(255,255,255,0.08)">
            <IconBuilding size={10} stroke={2} /> 3개 병원 통합
          </Badge>
        </div>
        <h1 style={{ color: T.white, fontSize: 26, fontWeight: 700, letterSpacing: -0.5, margin: 0 }}>
          루이의 통합 의료 기록
        </h1>
      </div>

      {/* Allergy alert (pinned) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,90,90,0.14), rgba(255,90,90,0.04))',
        border: '1px solid rgba(255,90,90,0.3)',
        borderRadius: 16, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: 'rgba(255,90,90,0.18)', color: '#FF8585',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconAlert size={18} stroke={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#FF8585', fontSize: 11, fontWeight: 700, letterSpacing: 0.3, marginBottom: 2 }}>
            ⚠️ 알러지/주의사항
          </div>
          <div style={{ color: T.white, fontSize: 14, fontWeight: 600 }}>
            페니실린 알러지 · 사용 금지
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { label: '총 진료', value: '11건' },
          { label: '연간 진료비', value: '847K' },
          { label: '보험 환급', value: '678K' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: T.card, borderRadius: 14, padding: '12px 12px',
            border: `1px solid ${T.border}`,
          }}>
            <div style={{ color: T.gray, fontSize: 10, fontWeight: 600, marginBottom: 4, letterSpacing: 0.2 }}>{s.label}</div>
            <div style={{ color: T.white, fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div>
        <SectionTitle action="필터">시간순 타임라인</SectionTitle>
        <div style={{ position: 'relative' }}>
          {/* vertical line */}
          <div style={{
            position: 'absolute', left: 19, top: 18, bottom: 18,
            width: 1, background: T.border,
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MEDICAL_RECORDS.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                {/* dot + icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: i === 0 ? T.accent : T.cardHi,
                  color: i === 0 ? T.accentText : T.white,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  border: i === 0 ? 'none' : `1px solid ${T.border}`,
                  zIndex: 1,
                }}>
                  {r.icon}
                </div>
                {/* card */}
                <div style={{
                  flex: 1, background: T.card, borderRadius: 16,
                  border: `1px solid ${T.border}`, padding: 14, minWidth: 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: T.gray, fontSize: 11, fontWeight: 600, fontFamily: 'ui-monospace, monospace' }}>
                      {r.date}
                    </span>
                    <Badge color={T.gray} bg="rgba(255,255,255,0.05)" style={{ fontSize: 10 }}>
                      {r.code}
                    </Badge>
                  </div>
                  <div style={{ color: T.white, fontSize: 14, fontWeight: 600, letterSpacing: -0.2, marginBottom: 2 }}>
                    {r.dx}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <IconBuilding size={11} stroke={2} style={{ color: T.gray }} />
                      <span style={{ color: T.gray, fontSize: 11, fontWeight: 500 }}>{r.hospital}</span>
                      <span style={{ color: T.grayDim }}>·</span>
                      <span style={{ color: T.gray, fontSize: 11, fontWeight: 500 }}>{r.type}</span>
                    </div>
                    <span style={{ color: T.white, fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                      {r.cost.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// INSURANCE SCREEN  — HERO
// ─────────────────────────────────────────────────────────────
function InsuranceScreen() {
  // Pulsing count-up for 30
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      setSeconds(Math.min(n, 30));
      if (n >= 30) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ paddingTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999, background: T.accent,
            boxShadow: `0 0 12px ${T.accent}`,
            animation: 'pulse 1.6s ease-in-out infinite',
          }} />
          <span style={{ color: T.accent, fontSize: 12, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Zero-Touch 청구
          </span>
        </div>
        <h1 style={{ color: T.white, fontSize: 26, fontWeight: 700, letterSpacing: -0.5, margin: 0, lineHeight: 1.2 }}>
          방금 자동으로<br />처리됐어요
        </h1>
      </div>

      {/* Big success card */}
      <div style={{
        background: `linear-gradient(160deg, #c5f048 0%, #a8d62e 100%)`,
        borderRadius: 24, padding: '22px 22px 20px',
        color: T.accentText, position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 40px -12px rgba(197,240,72,0.35)',
      }}>
        {/* decorative grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)',
          backgroundSize: '14px 14px', opacity: 0.5,
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999, background: T.accentText,
                color: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IconCheck size={18} stroke={3} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.2 }}>예방접종 자동 청구 완료</span>
            </div>
            <Badge color={T.accent} bg="rgba(10,10,10,0.85)" style={{ padding: '5px 10px', fontSize: 11, fontWeight: 700 }}>
              <IconZap size={11} stroke={2.5} /> {seconds}초
            </Badge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            <Row label="진료비" value="40,000원" big />
            <Row label="보험 승인" value="32,000원" plus />
            <div style={{ height: 1, background: 'rgba(10,10,10,0.12)', margin: '2px 0' }} />
            <Row label="자기부담금" value="8,000원" bold />
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(10,10,10,0.08)', borderRadius: 10, padding: '8px 12px',
          }}>
            <IconCheckCircle size={13} stroke={2.5} />
            <span style={{ fontSize: 12, fontWeight: 600 }}>현장에서 8,000원만 결제했어요</span>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div style={{
        background: T.card, border: `1px solid ${T.border}`,
        borderRadius: 20, padding: 18,
      }}>
        <div style={{ color: T.gray, fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 12 }}>
          청구 소요 시간 비교
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: T.grayDim, fontSize: 11, fontWeight: 600, marginBottom: 4 }}>기존 절차</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ color: T.gray, fontSize: 24, fontWeight: 700, textDecoration: 'line-through', textDecorationColor: T.grayDim, letterSpacing: -0.5 }}>
                1~2주
              </span>
            </div>
            <div style={{ color: T.grayDim, fontSize: 10, fontWeight: 500, marginTop: 2 }}>
              영수증 업로드, 서류 발급
            </div>
          </div>
          <div style={{ color: T.accent, flexShrink: 0 }}>
            <IconArrowRight size={20} stroke={2.5} />
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ color: T.accent, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>PetLink AI</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'flex-end' }}>
              <span style={{ color: T.white, fontSize: 32, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
                30
              </span>
              <span style={{ color: T.white, fontSize: 16, fontWeight: 700 }}>초</span>
            </div>
            <div style={{ color: T.accent, fontSize: 10, fontWeight: 600, marginTop: 2 }}>
              RFID 스캔 → 자동
            </div>
          </div>
        </div>
        {/* progress visualization */}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: T.grayDim }} />
          </div>
          <span style={{ color: T.grayDim, fontSize: 9, fontFamily: 'ui-monospace, monospace' }}>14d</span>
        </div>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ width: '0.5%', height: '100%', background: T.accent, boxShadow: `0 0 8px ${T.accent}` }} />
          </div>
          <span style={{ color: T.accent, fontSize: 9, fontFamily: 'ui-monospace, monospace' }}>30s</span>
        </div>
      </div>

      {/* Recent claims */}
      <div>
        <SectionTitle action="전체">최근 자동 청구 내역</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { date: '오늘 14:32', label: '예방접종', sub: '한사랑 동물병원', amt: 32000 },
            { date: '03.15', label: '슬개골 X-ray', sub: '강남펫메디컬', amt: 96000 },
            { date: '02.08', label: '심장사상충 예방', sub: '한사랑 동물병원', amt: 22400 },
          ].map((c, i) => (
            <div key={i} style={{
              background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: T.accentDim, color: T.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <IconCheck size={14} stroke={3} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: T.white, fontSize: 13, fontWeight: 600, letterSpacing: -0.2 }}>{c.label}</span>
                  <span style={{ color: T.accent, fontSize: 10, fontWeight: 700 }}>자동 승인</span>
                </div>
                <div style={{ color: T.gray, fontSize: 11, fontWeight: 500, marginTop: 1 }}>
                  {c.sub} · {c.date}
                </div>
              </div>
              <span style={{ color: T.white, fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                +{c.amt.toLocaleString()}원
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, big, plus, bold }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.7 }}>{label}</span>
      <span style={{
        fontSize: big ? 22 : (bold ? 20 : 18),
        fontWeight: big || bold ? 800 : 700,
        letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums',
      }}>
        {plus ? '−' : ''}{value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────────────────────────
function ProfileScreen() {
  const remaining = 3322000;
  const limit = 5000000;
  const pct = (remaining / limit) * 100;

  return (
    <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ paddingTop: 8 }}>
        <h1 style={{ color: T.white, fontSize: 26, fontWeight: 700, letterSpacing: -0.5, margin: 0 }}>
          마이페이지
        </h1>
      </div>

      {/* Owner card */}
      <Card style={{ padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 999,
            background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
            border: `1px solid ${T.borderHi}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.white, fontWeight: 700, fontSize: 18,
          }}>김</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: T.white, fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>김지영</div>
            <div style={{ color: T.gray, fontSize: 12, fontWeight: 500 }}>010-2847-****  ·  보호자</div>
          </div>
          <button style={{
            padding: '6px 12px', borderRadius: 999, flexShrink: 0, whiteSpace: 'nowrap',
            background: 'rgba(255,255,255,0.06)', color: T.white,
            border: `1px solid ${T.border}`, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>편집</button>
        </div>
      </Card>

      {/* Pet linked card */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <PetAvatar size={44} emoji="🐕" />
          <div style={{ flex: 1 }}>
            <div style={{ color: T.white, fontSize: 14, fontWeight: 700 }}>루이</div>
            <div style={{ color: T.gray, fontSize: 11 }}>골든리트리버 · 만 4살</div>
          </div>
          <Badge>
            <IconChip size={10} stroke={2} /> RFID
          </Badge>
        </div>
        <button style={{
          width: '100%', padding: '10px', borderRadius: 12,
          background: 'rgba(255,255,255,0.04)', border: `1px dashed ${T.borderHi}`,
          color: T.gray, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          + 다른 반려동물 추가
        </button>
      </Card>

      {/* Insurance — linked */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: T.accentDim, color: T.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <IconShield size={20} stroke={1.8} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: T.gray, fontSize: 11, fontWeight: 600, marginBottom: 2 }}>연동된 펫보험</div>
            <div style={{ color: T.white, fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>
              메리츠펫보험 · 든든플랜
            </div>
          </div>
          <Badge>
            <IconCheck size={10} stroke={3} /> 활성
          </Badge>
        </div>
        <div style={{ height: 1, background: T.border, margin: '0 18px' }} />
        <div style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: T.gray, fontSize: 12, fontWeight: 500 }}>청구 가능 잔여 한도</span>
            <span style={{ color: T.grayDim, fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>연간 5,000,000원</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
            <span style={{ color: T.white, fontSize: 28, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              3,322,000
            </span>
            <span style={{ color: T.white, fontSize: 14, fontWeight: 600 }}>원</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{
              width: `${pct}%`, height: '100%', background: T.accent,
              boxShadow: `0 0 8px ${T.accent}`,
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ color: T.accent, fontSize: 10, fontWeight: 700 }}>66% 남음</span>
            <span style={{ color: T.gray, fontSize: 10, fontWeight: 500 }}>2026년 기준</span>
          </div>
        </div>
      </Card>

      {/* AI nudge card */}
      <div style={{
        background: `linear-gradient(135deg, rgba(197,240,72,0.1), rgba(197,240,72,0.02))`,
        border: `1px solid rgba(197,240,72,0.18)`,
        borderRadius: 20, padding: 18,
        display: 'flex', alignItems: 'flex-start', gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
          background: T.accent, color: T.accentText,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconSparkles size={16} stroke={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: T.accent, fontSize: 11, fontWeight: 700, letterSpacing: 0.2, marginBottom: 3 }}>
            PetLink AI
          </div>
          <div style={{ color: T.white, fontSize: 14, fontWeight: 600, letterSpacing: -0.2, lineHeight: 1.45 }}>
            "심장사상충 예방 시기가 가까워졌어요.<br />다음에 알려드릴게요 🐾"
          </div>
        </div>
      </div>

      {/* Settings list */}
      <div>
        <SectionTitle>설정</SectionTitle>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { icon: <IconShare size={17} stroke={1.8} />, label: '가족 공유 관리', sub: '2명 연결됨' },
            { icon: <IconBell size={17} stroke={1.8} />, label: '알림 설정', sub: '진료/청구/일정' },
            { icon: <IconSettings size={17} stroke={1.8} />, label: '계정 설정' },
            { icon: <IconHelp size={17} stroke={1.8} />, label: '문의하기' },
          ].map((it, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px',
              borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
              cursor: 'pointer',
            }}>
              <div style={{ color: T.gray }}>{it.icon}</div>
              <div style={{ flex: 1, color: T.white, fontSize: 14, fontWeight: 500, letterSpacing: -0.2 }}>{it.label}</div>
              {it.sub && <span style={{ color: T.gray, fontSize: 12, fontWeight: 500 }}>{it.sub}</span>}
              <IconChevronRight size={15} stroke={2} style={{ color: T.grayDim }} />
            </div>
          ))}
        </Card>
      </div>

      <div style={{ textAlign: 'center', color: T.grayDim, fontSize: 10, marginTop: 8 }}>
        PetLink AI · v1.0.0
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB BAR
// ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'home', label: '홈', icon: IconHome },
  { id: 'medical', label: '의료', icon: IconActivity },
  { id: 'insurance', label: '청구', icon: IconShield },
  { id: 'profile', label: '마이', icon: IconUser },
];

function TabBar({ active, onChange }) {
  return (
    <div style={{
      position: 'sticky', bottom: 0, left: 0, right: 0, zIndex: 30,
      background: 'rgba(10,10,10,0.85)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderTop: `1px solid ${T.border}`,
      padding: '10px 14px 30px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {TABS.map((t) => {
          const isActive = active === t.id;
          const I = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              style={{
                flex: 1, background: 'transparent', border: 'none', padding: '6px 0',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                cursor: 'pointer', transition: 'transform 120ms ease',
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = ''; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
            >
              <div style={{ color: isActive ? T.accent : T.grayDim, position: 'relative' }}>
                <I size={22} stroke={isActive ? 2.2 : 1.8} />
                {isActive && (
                  <div style={{
                    position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
                    width: 4, height: 4, borderRadius: 999, background: T.accent,
                    boxShadow: `0 0 6px ${T.accent}`,
                  }} />
                )}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: -0.1,
                color: isActive ? T.accent : T.grayDim,
              }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// APP SHELL
// ─────────────────────────────────────────────────────────────
function App() {
  const [tab, setTab] = useState('home');
  const [animKey, setAnimKey] = useState(0);

  const goto = (t) => {
    if (t === tab) return;
    setTab(t);
    setAnimKey((k) => k + 1);
  };

  const screen = (() => {
    switch (tab) {
      case 'home': return <HomeScreen goto={goto} />;
      case 'medical': return <MedicalScreen />;
      case 'insurance': return <InsuranceScreen />;
      case 'profile': return <ProfileScreen />;
      default: return null;
    }
  })();

  return (
    <div style={{
      minHeight: '100vh', background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '32px 20px', fontFamily: KR_FONT, gap: 18,
    }}>
      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .screen-enter { animation: slideIn 280ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>

      <IOSDevice dark width={393} height={852}>
        <div style={{
          minHeight: '100%', paddingTop: 56,
          display: 'flex', flexDirection: 'column',
        }}>
          <div key={animKey} className="screen-enter" style={{ flex: 1 }}>
            {screen}
          </div>
          <TabBar active={tab} onChange={goto} />
        </div>
      </IOSDevice>

      <div style={{
        color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500,
        letterSpacing: 0.3, textAlign: 'center',
      }}>
        PetLink AI 보호자 앱 프로토타입
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
