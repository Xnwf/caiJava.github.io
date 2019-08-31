/**
 * 结点
 * @param {结点值} element 
 */
function Node(element) {
    this.element = element;
    this.left = null;
    this.right = null;
}

function BST() {
    this.root = null;
    this.size = 0;
    this.NODE_VERTICAL_DISTANT = 40;    
    this.ARC_SIZE = 14;
    /**
     * 渲染树
     */
    this.render = function(ctx, node,  x, y) {
        ctx.clearRect(0, 0, 500, 400);
        if (this.root)
        this.draw(node, ctx, x, y, Math.PI / 2.5);
    }
    
    /**
     * 渲染结点递归实现
     */
    this.draw = function(node, ctx, x, y, angle) {
        if (node) {
            this.drawArc(node, ctx, x, y);
            // 判断是否有子树
            if (node.left)
                this.drawLine(ctx, x, y, x - this.getLevelDistant(angle), y + this.NODE_VERTICAL_DISTANT);
            if (node.right)
                this.drawLine(ctx, x, y, x + this.getLevelDistant(angle), y + this.NODE_VERTICAL_DISTANT);
        }

        if (node.left) {
            this.draw(node.left, ctx, x - this.getLevelDistant(angle), y + this.NODE_VERTICAL_DISTANT, this.getNextAngle(angle));
        }
        if (node.right) {
            this.draw(node.right, ctx, x + this.getLevelDistant(angle), y + this.NODE_VERTICAL_DISTANT, this.getNextAngle(angle));
        }

        
    }

    /**
     * 获取
     */
    this.getLevelDistant = function(angle) {
        return Math.tan(angle) * this.NODE_VERTICAL_DISTANT;
    }

    /**
     * 每一层角度变化
     */
    this.getNextAngle = function(angle) {
        let result = 0.72 * angle + 0.09;
        return result;
    }

    /**
     * 画圆
     */
    this.drawArc = function(node, ctx, x, y) {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(x, y, this.ARC_SIZE, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillText(node.element, x - this.ARC_SIZE / 1.5, y + this.ARC_SIZE / 2);
        ctx.closePath();
    }

    this.drawLine = function(ctx, x, y, toX, toY) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = 'yellow';
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * 向二叉搜索树中添加一个节点
     */
    this.add = function(element) {
        if (this.root == null) {
            this.root = new Node(element);
        } else {
            this.addDep(this.root, element);
        }
    }


    /**
     * 添加结点的递归实现
     */
    this.addDep = function(node, element) {
        if (element < node.element && node.left == null) {
            node.left = new Node(element);
            return;
        } else if (element > node.element && node.right == null) {
            node.right = new Node(element);
            return;
        }

        if (element < node.element && node.left != null) {
            this.addDep(node.left, element);
            return;
        } else if (element > node.element && node.right != null) {
            this.addDep(node.right, element);
            return;
        }
    }

    /**
     * 删除最小结点
     */
    this.removeMin = function() {
        this.root = this.removeMinRecursion(this.root);
    }

    /**
     * 删除最小结点的递归实现
     */
    this.removeMinRecursion = function(node) {
        if (node.left == null) {
            let rightNode = node.right;
            node.right = null
            return rightNode;
        }
        node.left = this.removeMinRecursion(node.left);
        return node;
    }

    /**
     * 删除最大结点
     */
    this.removeMax = function() {
        this.root = this.removeMaxRecursion(this.root);
    }

    /**
     * 删除最大结点的递归实现
     */
    this.removeMaxRecursion = function(node) {
        if (!node) return null;

        if (node.right == null) {
            return node.left;
        }

        node.right = this.removeMaxRecursion(node.right);
        return node;
    }

    /**
     * 删除节点
     */
    this.remove = function(element) {
        this.root = this.removeRecursion(this.root, element);
    }

    /**
     * 删除节点的递归实现
     */
    this.removeRecursion = function(node, element) {
        if (node == null) return null;

        if (element < node.element) {
            node.left = this.removeRecursion(node.left, element);
            return node;
        }

        if (element > node.element) {
            node.right = this.removeRecursion(node.right, element);
            return node;
        }  
            
        if (node.left == null) {
            return node.rigth;
        } else if (node.right == null) {
            return node.left;

        }
        
        let itemNode = this.getMinRecursion(node.right);
        itemNode.right = this.removeMinRecursion(node.right);
        itemNode.left = node.left;
        console.log(node.left);
        console.log(itemNode);
        return itemNode;
    }

    /**
     * 获取root为根结点的最小值
     */
    this.getMin = function() {
        return this.getMinRecursion(this.root);
    }

    /**
     * 获取以
     */
    this.getMinRecursion = function(node) {
        if (node.left == null) return node;
        return this.getMinRecursion(node.left);
    }

    /**
     * 获取root为根结点的最大值 
     */
    this.getMax = function() {
        return this.getMaxRecursion(this.root);
    }

    /**
     * 获取以node为根结点的最大值
     */
    this.getMaxRecursion = function(node) {
        if (node.right == null) return node;
        return this.getMaxRecursion(node.right);
    }

    /**
     * 前序遍历
     */
    this.preOrder = function() {
        this.preOrderDep(this.root);
    }

    /**
     * 前序遍历递归实现
     */
    this.preOrderDep = function(node) {
        if(node) {
            console.log(node.element);
            this.preOrderDep(node.left);
            this.preOrderDep(node.right);
        }
    }

    /**
     * 中序遍历
     */
    this.inOrder = function() {
        this.inOrderDep(this.root);
    }

    /**
     * 中序遍历递归实现
     */
    this.inOrderDep = function(node) {
        if(node) {
            this.inOrderDep(node.left);
            console.log(node.element);
            this.inOrderDep(node.right);
        }
    }

}