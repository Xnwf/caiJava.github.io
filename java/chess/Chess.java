package com.demo.chess;

import java.io.IOException;
import java.util.Scanner;

/**
 * Created by Administrator on 2019/7/28/028.
 * 五子棋
 */
public class Chess {

    /**
     * 棋盘大小
     */
    final private int SIZE = 10;

    /**
     * 表示棋盘的二维数组
     */
    private String[][] chessBoard;

    /**
     * 表示当前是黑棋还是白棋

     */
    private boolean flag = true;

    /**
     * 多少个棋子连线就胜利
     */
    private int WIN_COUNT = 5;

    /**
     * 最后一次下棋的位置
     */
    private int x = 0;
    private int y = 0;

    public Chess() {
        this.init();
        this.render();
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        Chess chess = new Chess();
        while (true) {
            Scanner scanner = new Scanner(System.in);
            // 下棋
            chess.player(scanner);
            // 打印棋盘
            chess.render();
            // 判断是否已经游戏结束
            if (chess.checkIsWin(chess.x, chess.y)) {
                if (chess.flag) {
                    System.out.println("\033[93;1m" + "=====================\n=======黑方胜出=======\n=====================" + "\033[0m");
                } else {
                    System.out.println("\033[93;1m" + "=====================\n=======白方胜出=======\n=====================" + "\033[0m");
                }
                break;
            }
        }
    }

    /**
     * 遍历是否胜利
     */
    private boolean checkIsWin(final int x, final int y) {
        // 棋盘大小
        int size = SIZE;
        // 记录有多少个棋子连线
        int count = 1;
        // 胜利条件是多少个棋子连线
        int winCount = WIN_COUNT;
        // 当前坐标棋子
        String currentChess = chessBoard[x][y];

        // 遍历竖直方向
        // 遍历下方
        for (int i = x + 1; i < size; i ++) {
            if(chessBoard[i][y].equals(currentChess)) {
                count ++;
            } else {
                break;
            }
        }
        // 遍历上方
        for (int i = x - 1; i >= 0; i --) {
            if(chessBoard[i][y].equals(currentChess)) {
                count ++;
            } else {
                break;
            }
        }
//        System.out.println("当前竖直连珠: " + count);
        if (count >= WIN_COUNT) {
            return true;
        } else {
            count = 1;
        }

        // 遍历左右方向
        // 遍历左方
        for (int i = y - 1; i >= 0; i --) {
            if(chessBoard[x][i].equals(currentChess)) {
                count ++;
            } else {
                break;
            }
        }
        // 遍历右方
        for (int i = y + 1; i < size; i ++) {
            if(chessBoard[x][i].equals(currentChess)) {
                count ++;
            } else {
                break;
            }
        }
//        System.out.println("当前横向连珠: " + count);
        if (count >= WIN_COUNT) {
            return true;
        } else {
            count = 1;
        }

        // 遍历 / 方向
        // 遍历右上
        for (int i = x - 1, j = y + 1; i >= 0 && j < size; i --, j ++) {
            if (chessBoard[i][j].equals(currentChess)) {
                count++;
            } else {
                break;
            }
        }
        // 遍历左下
        for (int i = x + 1, j = y - 1; i < size && j >= 0; i ++, j --) {
            if (chessBoard[i][j].equals(currentChess)) {
                count++;
            } else {
                break;
            }
        }
//        System.out.println("当前 / 连珠: " + count);
        if (count >= WIN_COUNT) {
            return true;
        } else {
            count = 1;
        }

        // 遍历 \ 方向
        // 遍历左上
        for (int i = x - 1, j = y - 1; i >= 0 && j >= 0; i --, j --) {
            if (chessBoard[i][j].equals(currentChess)) {
                count++;
            } else {
                break;
            }
        }
        // 遍历右下
        for (int i = x + 1, j = y + 1; i < size && j < size; i ++, j ++) {
            if (chessBoard[i][j].equals(currentChess)) {
                count++;
            } else {
                break;
            }
        }
//        System.out.println("当前 \\ 连珠: " + count);
        if (count >= this.WIN_COUNT) {
            return true;
        } else {
            count = 1;
        }
        return false;
    }

    /**
     * 初始化棋盘
     */
    private void init() {
        int size = this.SIZE;
        chessBoard = new String[size][];
        for (int i = 0; i < size; i++) {
            String[] row = new String[size];
            for (int j = 0; j < size; j++) {
                row[j] = "+";
            }
            chessBoard[i] = row;
        }
    }

    /**
     * 渲染棋盘
     */
    private void render() {
        int size = this.SIZE;
        System.out.print("  ");
        for (int i = 0; i < size; i++) {
            System.out.print("\033[91;1m" + i + "\033[0m" + " ");
        }
        System.out.println();
        for (int i = 0; i < size; i++) {
            System.out.print("\033[91;1m" + i + "\033[0m" + " ");
            for (int j = 0; j < size; j++) {
                String value = chessBoard[i][j];
                if (value.equals("●")) {
                    System.out.print("\033[93;1m" + value + "\033[0m" + " ");
                } else if (value.equals("○")) {
                    System.out.print("\033[96;1m" + value + "\033[0m" + " ");
                } else {
                    System.out.print("\033[95;1m" + value + "\033[0m" + " ");
                }
            }
            System.out.println();
        }
    }
    private void player(Scanner scanner) {
        System.out.println("请下棋，示例：2,3");
        String orgin = scanner.nextLine();
        String [] orginArr = orgin.split(",");
        if (orginArr.length != 2) {
            System.out.println("请按照格式输入坐标！");
            player(scanner);
            return ;
        }
        int x = 0;
        int y = 0;
        try{
            x = Integer.parseInt(orginArr[0]);
            y = Integer.parseInt(orginArr[1]);
        } catch (NumberFormatException e) {
            System.out.println("请输入正确的数字！");
            player(scanner);
            return ;
        }
        if (x > this.SIZE || y > this.SIZE) {
            System.out.println("超出棋盘，请重新输入！");
            player(scanner);
            return ;
        }
        if (!this.chessBoard[x][y].equals("+")) {
            System.out.println("当前位置已被占！");
            player(scanner);
            return ;
        }
        // 下棋
        if (flag) {
            chessBoard[x][y] = "●";
            flag = !flag;
        } else {
            chessBoard[x][y] = "○";
            flag = !flag;
        }
        this.x = x;
        this.y = y;
    }
}
