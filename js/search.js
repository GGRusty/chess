var SearchController = {};

SearchController.nodes;
SearchController.fh;
SearchController.fhf;
SearchController.depth;
SearchController.time;
SearchController.start;
SearchController.stop;
SearchController.best;
SearchController.thinking;

function CheckUp() {
  if (Date.now() - SearchController.start > SearchController.time) {
    SearchController.stop = BOOL.TRUE;
  }
}

function IsRepetition() {
  var index = 0;

  for (index = GameBoard.hisPly - GameBoard.fiftyMove; index < GameBoard.hisPly - 1; ++index) {
    if (GameBoard.posKey == GameBoard.history[index].posKey) {
      return BOOL.TRUE;
    }
  }
  return BOOL.FALSE;
}

function AlphaBeta(alpha, beta, depth) {
  if (depth <= 0) {
    return EvalPosition();
  }

  if ((SearchController.nodes & 2047) == 0) {
    // every 2048 nodes check if time up
    CheckUp();
  }

  SearchController.nodes++;

  if ((IsRepetition() || GameBoard.fiftyMove >= 100) & (GameBoard.ply != 0)) {
    return 0;
  }

  if (GameBoard.ply > MAXDEPTH - 1) {
    return EvalPosition();
  }

  var Score = -INFINITE;
  GenerateMoves();
  var MoveNum = 0;
  var Legal = 0;
  var OldAlpha = alpha;
  var BestMove = NOMOVE;
  var Move = NOMOVE;
  // search best line first in the pv (principal variation) table
  // order pv table moves
  for (
    MoveNum = GameBoard.moveListStart[GameBoard.ply];
    MoveNum < GameBoard.moveListStart[GameBoard.ply + 1];
    ++MoveNum
  ) {
    // pick next best move
    Move = GameBoard.moveList[index];

    if (MakeMove(Move) == BOOL.FALSE) {
      continue;
    }
    Legal++;
    Score = -AlphaBeta(-beta, -alpha, depth - 1);

    TakeMove();

    if (SearchController.stop == BOOL.TRUE) {
      return 0;
    }

    if (Score > alpha) {
      if (Score >= beta) {
        if (Legal == 1) {
          SearchController.fhf++;
        }
        SearchController.fh++;
        // update killer moves
        return beta;
      }
      alpha = Score;
      BestMove = Move;
      // update history table
    }
  }
  // check for mate or stalemate
  if (alpha != OldAlpha) {
    // store Pv move
  }

  return alpha;
}

function SearchPosition() {
  var bestMove = NOMOVE;
  var bestScore = -INFINITE;
  var currentDepth = 0;

  for (currentDepth = 1; currentDepth <= SearchController.depth; ++currentDepth) {
    // AlphaBeta(-INFINITE, INFINITE, currentDepth);
    if (SearchController.stop == BOOL.TRUE) {
      break;
    }
  }
  SearchController.best = bestMove;
  SearchController.thinking = BOOL.FALSE;
}
