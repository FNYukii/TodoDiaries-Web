import dayjs from "dayjs";
import ChartRecord from "../entities/ChartRecord";
import Todo from "../entities/Todo";

class ChartService {

	static toMonthChartRecords(from: Todo[], offset: number): ChartRecord[] {

		const todos = from

		// 今の情報
		const now = dayjs()
		const shiftedNow = now.add(offset, 'month')
		const currentYear = shiftedNow.year()
		const currentMonth = shiftedNow.month() + 1

		// 今月の日数
		const dayCount = dayjs().daysInMonth()

		// todosを元にdataを生成
		let chartRecords: ChartRecord[] = []

		for (let i = 1; i < dayCount + 1; i++) {

			// この日のTodo達成数
			let achieveCount = 0

			// 全てのTodoを検査し、この日のTodo達成数を取得する
			todos.forEach(todo => {

				// Todo達成日時、この日、この日の次の日の3つのDate
				const achievedAt = todo.achievedAt!
				const currentDay = dayjs(`${currentYear}-${currentMonth}-${i}`).toDate()
				const nextDay = dayjs(`${currentYear}-${currentMonth}-${i + 1}`).toDate()

				// 3つのDateを比較して、達成日時が今日と明日の間かどうか判定
				if (achievedAt >= currentDay && achievedAt < nextDay) {
					achieveCount += 1
				}
			})

			// この日のTodo達成数が取得できたら、配列dataに要素を追加
			const chartRecord = {
				label: `${i}日`,
				value: achieveCount
			}

			chartRecords.push(chartRecord)
		}

		return chartRecords
	}

}

export default ChartService