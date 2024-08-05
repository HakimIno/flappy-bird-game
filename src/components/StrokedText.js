import React from 'react';
import { Canvas, Skia, useFont, Glyphs, PaintStyle } from '@shopify/react-native-skia';

const StrokedText = ({ text, x, y, fontSize, color, strokeColor, strokeWidth, font }) => {
    // Ensure the font is loaded
    if (!font) {
        return null;
    }

    // Create the stroke paint
    const strokePaint = Skia.Paint();
    strokePaint.setColor(Skia.Color(strokeColor));
    strokePaint.setStyle(PaintStyle.Stroke);
    strokePaint.setStrokeWidth(strokeWidth);

    // Create the fill paint
    const fillPaint = Skia.Paint();
    fillPaint.setColor(Skia.Color(color));
    fillPaint.setStyle(PaintStyle.Fill);

    // Convert the text to glyphs
    const glyphs = font.getGlyphIDs(text).map((id, index) => ({
        id,
        x: x + index * fontSize,
        y,
    }));

    return (
        <Canvas style={{ flex: 1 }}>
            <Glyphs glyphs={glyphs} font={font} paint={strokePaint} />
            <Glyphs glyphs={glyphs} font={font} paint={fillPaint} />
        </Canvas>
    );
};

export default StrokedText;
