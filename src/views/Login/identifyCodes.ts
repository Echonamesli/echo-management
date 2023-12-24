const randoms = {
    colorMin: 10,
    colorMax: 20,
    backgroundColorMin: 180,
    backgroundColorMax: 240,
    fontSizeMin: 16,
    fontSizeMax: 22,
};

//根据验证码字符串生成验证码图片
export default function RandomCode(code: string) {
    //随机数字
    const randomNum = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    //随机颜色
    const randomColor = (min: number, max: number) => {
        return `rgba(${randomNum(min, max)}, ${randomNum(min, max)}, ${randomNum(min, max)}})`
    }
    //画图
    const draw = () => {
        const canvas = document.getElementById("code-canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d")! //!（非空断言）： 在 TypeScript 中，! 是一种非空断言运算符，它告诉 TypeScript 编译器，你确信这个表达式的结果不会是 null 或 undefined
        const width = canvas.width
        const height = canvas.height
        ctx.textBaseline = "bottom"
        //绘制背景
        ctx.fillStyle = randomColor(
            randoms.backgroundColorMin,
            randoms.backgroundColorMax
        );
        ctx.fillRect(0, 0, width, height)

        //绘制每一个数字的函数
        const drawText = (
            ctx: CanvasRenderingContext2D,
            txt: string,
            i: number,
            width: number,
            height: number
        ) => {
            ctx.fillStyle = randomColor(randoms.colorMin, randoms.colorMax);
            //设置字体样式：尺寸+宋体
            ctx.font = randomNum(randoms.fontSizeMin, randoms.fontSizeMax) + "px SimHei"
            const x = ((i + 1) * width) / (code.length + 1)   //将文本在水平方向上均匀分布在 Canvas 的宽度上
            const y = randomNum(randoms.fontSizeMax, height - 5)
            const deg = randomNum(-45, 45)
            // 修改坐标原点和旋转角度
            ctx.translate(x, y);   // 修改 Canvas 上下文的坐标原点，将原点移到计算得到的 (x, y) 处。
            ctx.rotate((deg * Math.PI) / 180);  //旋转 Canvas 上下文，使文本按照计算得到的角度进行旋转。这里使用了 Math.PI 来将角度转换为弧度。
            ctx.fillText(txt, 0, 0);
            // 绘制完之后要恢复坐标原点和旋转角度，确保这些变换只对当前的绘制操作生效，不会影响到之后的其他绘制
            ctx.rotate((-deg * Math.PI) / 180);
            ctx.translate(-x, -y);
        }
        //开始绘制每一个数字
        for(let i = 0; i < code.length; i++){
            drawText(ctx, code[i], i, width, height)
        }
        draw()
    }
}