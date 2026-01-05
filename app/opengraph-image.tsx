import { ImageResponse } from 'next/og';

export const size = {
    width: 1200,
    height: 630,
    };
    export const contentType = 'image/png';

    export default async function Image() {
    return new ImageResponse(
        (
        <div
            style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            padding: '90px',
            fontFamily: 'sans-serif',
            justifyContent: 'center',
            }}
        >
            {/* 상단 로고 영역: 세련된 SVG 저울 아이콘 적용 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '80px' }}>
            <div style={{ 
                backgroundColor: '#2563eb', 
                width: '60px', 
                height: '60px', 
                borderRadius: '14px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                {/* 흰색 저울 SVG 아이콘 */}
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>
                </svg>
            </div>
            <span style={{ fontSize: '34px', fontWeight: '800', color: '#0f172a', letterSpacing: '-1px' }}>
                법률사무소 심주엽
            </span>
            </div>

            {/* 메인 텍스트: 강렬한 워딩 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ fontSize: '55px', fontWeight: '700', color: '#2563eb', letterSpacing: '-2px' }}>
                쿠팡 개인정보 유출
            </span>
            <span style={{ fontSize: '135px', fontWeight: '900', color: '#0f172a', lineHeight: '0.9', letterSpacing: '-7px' }}>
                피해자 집단소송
            </span>
            </div>

            {/* 하단 정보 바 */}
            <div style={{ 
            marginTop: '70px', 
            display: 'flex', 
            gap: '25px', 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#64748b',
            letterSpacing: '-1.5px',
            alignItems: 'center'
            }}>
            <span style={{ width: '1px', height: '24px', backgroundColor: '#cbd5e1' }} />
            <span>착수금 0원</span>
            <span style={{ width: '1px', height: '24px', backgroundColor: '#cbd5e1' }} />
            <span>온라인 접수 가능</span>
            </div>
        </div>
        ),
        { ...size }
    );
}