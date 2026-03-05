(() => {
    const canvas = document.getElementById('bond-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const SECONDARY_COLOR = '#5CDB95';
    const NODE_COUNT = 70;
    const MAX_DISTANCE = 160;
    const NODE_RADIUS = 2.5;
    let nodes = [];
    let width, height;

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    const createNode = () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: NODE_RADIUS + Math.random() * 1.5
    });

    const init = () => {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push(createNode());
        }
    };

    const update = () => {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0) { node.x = 0; node.vx *= -1; }
            if (node.x > width) { node.x = width; node.vx *= -1; }
            if (node.y < 0) { node.y = 0; node.vy *= -1; }
            if (node.y > height) { node.y = height; node.vy *= -1; }
        }
    };

    const draw = () => {
        ctx.clearRect(0, 0, width, height);

        // Draw bonds between nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAX_DISTANCE) {
                    const opacity = (1 - dist / MAX_DISTANCE) * 0.55;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(92, 219, 149, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw atom nodes
        for (let k = 0; k < nodes.length; k++) {
            const n = nodes[k];

            // Outer glow
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(92, 219, 149, 0.12)';
            ctx.fill();

            // Node circle
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
            ctx.fillStyle = SECONDARY_COLOR;
            ctx.fill();
        }
    };

    const animate = () => {
        update();
        draw();
        requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    window.addEventListener('resize', () => {
        resize();
        init();
    });
})();
