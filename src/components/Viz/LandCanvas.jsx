import { useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';
import Konva from 'konva';

const LandCanvas = ({ plot, recs }) => {
    const stageRef = useRef();
    const lineRef = useRef();

    useEffect(() => {
        if (!plot || !recs || !lineRef.current) return;
        const tween = new Konva.Tween({
            node: lineRef.current,
            duration: 1.5,
            opacity: 1,
            easing: Konva.Easings.EaseInOut,
        });
        tween.play();
        return () => tween.destroy();
    }, [plot, recs]);

    if (!plot) {
        return (
            <div style={{ 
                padding: '60px 20px',
                textAlign: 'center',
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '2px dashed #d0d0d0'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌾</div>
                <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
                    Configure your plot to see the layout visualization
                </p>
            </div>
        );
    }

    const { length, width } = plot;
    const scale = 3;
    const w = width * scale;
    const h = length * scale;
    const offset = 60;
    const zones = recs?.zones || [];

    const borderZones = zones.filter(z => z?.type === 'tree');
    const centerZones = zones.filter(z => z?.type === 'crop');
    const formation = recs?.formation || 'block';

    let borderElements = [];
    let centerElements = [];
    let treeIcons = [];
    let cropDots = [];

    // ONLY TREES
    if (centerZones.length === 0 && borderZones.length > 0) {
        const zone = borderZones[0];
        const spacingM = zone.spacingMeters || 6;

        const treesAlongWidth = Math.max(1, Math.floor(width / spacingM));
        const treesAlongLength = Math.max(1, Math.floor(length / spacingM));

        borderElements = [
            <Rect 
                key="full-plot" 
                x={offset} 
                y={offset} 
                width={w} 
                height={h} 
                fill={zone.color} 
                opacity={0.3} 
                stroke={zone.color} 
                strokeWidth={1} 
            />
        ];

        for (let i = 0; i < treesAlongWidth; i++) {
            for (let j = 0; j < treesAlongLength; j++) {
                const x = offset + (i + 0.5) * spacingM * scale;
                const y = offset + (j + 0.5) * spacingM * scale;
                if (x <= offset + w && y <= offset + h) {
                    treeIcons.push(
                        <Circle 
                            key={`grid-tree-${i}-${j}`} 
                            x={x} 
                            y={y} 
                            radius={6} 
                            fill={zone.color} 
                            stroke="#228B22" 
                            strokeWidth={1} 
                        />
                    );
                }
            }
        }
    }
    // BOTH TREES AND CROPS
    else {
        // BLOCK FORMATION
        if (formation === 'block') {
            if (borderZones.length > 0) {
                const zone = borderZones[0];
                const spacingM = zone.spacingMeters || 6;
                const borderAreaWidth = spacingM * scale;

                // Draw 4 border strips
                borderElements = [
                    <Rect key="top" x={offset} y={offset} width={w} height={borderAreaWidth} fill={zone.color} opacity={0.5} stroke={zone.color} strokeWidth={1} />,
                    <Rect key="bottom" x={offset} y={h + offset - borderAreaWidth} width={w} height={borderAreaWidth} fill={zone.color} opacity={0.5} stroke={zone.color} strokeWidth={1} />,
                    <Rect key="left" x={offset} y={offset} width={borderAreaWidth} height={h} fill={zone.color} opacity={0.5} stroke={zone.color} strokeWidth={1} />,
                    <Rect key="right" x={w + offset - borderAreaWidth} y={offset} width={borderAreaWidth} height={h} fill={zone.color} opacity={0.5} stroke={zone.color} strokeWidth={1} />
                ];

                // Place trees
                const treesTopBottom = Math.max(1, Math.floor(width / spacingM));
                const treesLeftRight = Math.max(1, Math.floor(length / spacingM));

                for (let i = 0; i < treesTopBottom; i++) {
                    const x = offset + (i + 0.5) * spacingM * scale;
                    const y1 = offset + borderAreaWidth / 2;
                    const y2 = h + offset - borderAreaWidth / 2;
                    if (x <= offset + w) {
                        treeIcons.push(
                            <Circle key={`tree-top-${i}`} x={x} y={y1} radius={6} fill={zone.color} stroke="#228B22" strokeWidth={1.5} />
                        );
                        treeIcons.push(
                            <Circle key={`tree-bottom-${i}`} x={x} y={y2} radius={6} fill={zone.color} stroke="#228B22" strokeWidth={1.5} />
                        );
                    }
                }

                for (let j = 0; j < treesLeftRight; j++) {
                    const y = offset + (j + 0.5) * spacingM * scale;
                    const x1 = offset + borderAreaWidth / 2;
                    const x2 = w + offset - borderAreaWidth / 2;
                    if (y <= offset + h) {
                        treeIcons.push(
                            <Circle key={`tree-left-${j}`} x={x1} y={y} radius={6} fill={zone.color} stroke="#228B22" strokeWidth={1.5} />
                        );
                        treeIcons.push(
                            <Circle key={`tree-right-${j}`} x={x2} y={y} radius={6} fill={zone.color} stroke="#228B22" strokeWidth={1.5} />
                        );
                    }
                }
            }

            // Center crops
            if (centerZones.length > 0) {
                const cropZone = centerZones[0];
                const spacingM = cropZone.spacingMeters || 0.75;
                const cropAreaX = offset + (spacingM * scale);
                const cropAreaY = offset + (spacingM * scale);
                const cropAreaWidth = w - 2 * spacingM * scale;
                const cropAreaHeight = h - 2 * spacingM * scale;

                centerElements.push(
                    <Rect 
                        key="crop-center" 
                        x={cropAreaX} 
                        y={cropAreaY} 
                        width={cropAreaWidth} 
                        height={cropAreaHeight} 
                        fill={cropZone.color} 
                        opacity={0.4} 
                        stroke="#4CAF50" 
                        strokeWidth={1} 
                    />
                );

                // Crop dots - scale based on actual count
                const maxDotsToShow = Math.min(40, cropZone.count);
                for (let i = 0; i < maxDotsToShow; i++) {
                    const randX = cropAreaX + Math.random() * cropAreaWidth;
                    const randY = cropAreaY + Math.random() * cropAreaHeight;
                    cropDots.push(
                        <Circle key={`crop-dot-${i}`} x={randX} y={randY} radius={2.5} fill={cropZone.color} opacity={0.85} />
                    );
                }
            }
        }
        // INTERCROPPING (Relay Cropping - Vertical Strips)
        else if (formation === 'intercropping') {
            if (centerZones.length > 0) {
                const totalCrops = centerZones.length;
                const stripeWidth = w / totalCrops;
                
                // Draw vertical strips for each crop
                centerElements = centerZones.map((zone, i) => (
                    <Rect 
                        key={`intercrop-strip-${i}`} 
                        x={offset + i * stripeWidth} 
                        y={offset} 
                        width={stripeWidth} 
                        height={h} 
                        fill={zone.color} 
                        opacity={0.4} 
                        stroke="#4CAF50" 
                        strokeWidth={2} 
                    />
                ));

                // Add dots for each crop stripe
                centerZones.forEach((zone, idx) => {
                    const dotsPerStripe = Math.min(35, Math.ceil(zone.count / 10)); // Scale dots appropriately
                    for (let i = 0; i < dotsPerStripe; i++) {
                        const stripeWidth = w / centerZones.length;
                        const stripX = offset + idx * stripeWidth;
                        const randX = stripX + Math.random() * stripeWidth;
                        const randY = offset + Math.random() * h;
                        cropDots.push(
                            <Circle 
                                key={`intercrop-dot-${idx}-${i}`} 
                                x={randX} 
                                y={randY} 
                                radius={2.5} 
                                fill={zone.color} 
                                opacity={0.85} 
                            />
                        );
                    }
                });
            }
        }
        // ALLEY CROPPING
        else if (formation === 'alley') {
            if (borderZones.length > 0) {
                const zone = borderZones[0];
                const spacingM = zone.spacingMeters || 6;
                const numRows = Math.max(1, Math.floor(length / spacingM));
                const rowSpacingPx = spacingM * scale;

                for (let j = 0; j < numRows; j++) {
                    const y = offset + j * rowSpacingPx;
                    
                    treeIcons.push(
                        <Line
                            key={`tree-row-line-${j}`}
                            points={[offset, y, offset + w, y]}
                            stroke={zone.color}
                            strokeWidth={3}
                            lineCap="round"
                        />
                    );

                    const treesPerRow = Math.max(1, Math.floor(width / spacingM));
                    for (let i = 0; i < treesPerRow; i++) {
                        const x = offset + (i + 0.5) * spacingM * scale;
                        treeIcons.push(
                            <Circle
                                key={`alley-tree-${j}-${i}`}
                                x={x}
                                y={y}
                                radius={6}
                                fill={zone.color}
                                stroke="#228B22"
                                strokeWidth={1.5}
                            />
                        );
                    }
                }

                if (centerZones.length > 0) {
                    const cropZone = centerZones[0];
                    for (let j = 0; j < numRows - 1; j++) {
                        const y1 = offset + j * rowSpacingPx;
                        const y2 = offset + (j + 1) * rowSpacingPx;
                        const alleyHeight = y2 - y1;

                        centerElements.push(
                            <Rect
                                key={`alley-crop-${j}`}
                                x={offset}
                                y={y1}
                                width={w}
                                height={alleyHeight}
                                fill={cropZone.color}
                                opacity={0.4}
                                stroke="#4CAF50"
                                strokeWidth={1}
                            />
                        );

                        const cropDotsCount = Math.min(cropZone.count, 25);
                        for (let i = 0; i < cropDotsCount; i++) {
                            const randX = offset + Math.random() * w;
                            const randY = y1 + Math.random() * alleyHeight;
                            cropDots.push(
                                <Circle
                                    key={`alley-dot-${j}-${i}`}
                                    x={randX}
                                    y={randY}
                                    radius={2.5}
                                    fill={cropZone.color}
                                    opacity={0.85}
                                />
                            );
                        }
                    }
                }
            }
        }
    }

    const formationLabel = formation === 'block' ? 'Block Formation (Border Trees)' : 
                          formation === 'intercropping' ? 'Intercropping (Relay)' : 
                          'Alley Cropping';

    return (
        <div style={{ 
            border: '2px solid #2d5016',
            borderRadius: '12px',
            background: '#f8f9fa',
            padding: '20px',
            margin: '20px 0'
        }}>
            <Stage 
                ref={stageRef} 
                width={w + offset * 2} 
                height={h + offset * 2} 
                style={{ background: '#ffffff', borderRadius: '8px' }}
            >
                <Layer>
                    <Line 
                        ref={lineRef} 
                        points={[
                            offset, offset, 
                            w + offset, offset, 
                            w + offset, h + offset, 
                            offset, h + offset, 
                            offset, offset
                        ]} 
                        stroke="#228B22" 
                        strokeWidth={3} 
                        closed 
                        opacity={0} 
                        lineCap="round" 
                        lineJoin="round" 
                    />
                    {borderElements}
                    {centerElements}
                    {treeIcons}
                    {cropDots}
                    <Text 
                        text={`Scale: 1px ≈ 0.5m | Plot: ${width}m W × ${length}m L | ${formationLabel}`} 
                        x={offset} 
                        y={offset - 30} 
                        fontSize={14} 
                        fontStyle="bold" 
                        fill="#333" 
                    />
                    {centerZones.length === 0 && borderZones.length > 0 && (
                        <Text 
                            text="Trees Only (Grid Layout)" 
                            x={offset + w - 200} 
                            y={offset - 30} 
                            fontSize={12} 
                            fill="#2d5016" 
                            fontStyle="italic" 
                        />
                    )}
                </Layer>
            </Stage>

            <div style={{ 
                marginTop: '20px',
                padding: '15px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
            }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#2d5016' }}>
                    Legend:
                </div>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {zones.map((zone, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                                width: '12px', 
                                height: '12px', 
                                borderRadius: zone.type === 'tree' ? '50%' : '2px',
                                background: zone.color,
                                border: zone.type === 'tree' ? '2px solid #2d5016' : 'none',
                                opacity: zone.type === 'crop' ? 0.7 : 1
                            }} />
                            <span style={{ fontSize: '14px' }}>{zone.label} ({zone.count})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandCanvas;