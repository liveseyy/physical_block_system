import math


def caclculate_blocks(cleaned_date: dict):
    """
    Просчитывает падения блоков.

    Изначальные координаты тел:
    (0,0)----------------(30, 0)---------------(60,0)
    |                                               |
    |                                               |
    |                                               |
    |                                               |
    |                                               |
    |                                               |
    (0,-20)                                  (60,-20)

    """
    # длина стола
    S_TABLE = 60
    # толщина стола
    l = 10
    # Длины нитей
    l1 = 40
    l2 = 40
    # Коэф. трения
    k = 0.65
    # Коэф. свободного падения
    g = 9.8

    m = cleaned_date.get('m')
    m1 = cleaned_date.get('m1')
    m2 = cleaned_date.get('m2')
    t = cleaned_date.get('t')
    t1 = None
    t2 = None
    t3 = None

    reversed_masses = False
    if m2 < m1:
        # для простоты расчётов считаем что второе тело (справа) тяжелее
        # потом для фронта зеркалим координаты как должно быть
        m2, m1 = m1, m2
        reversed_masses = True

    # 1 страница решения
    x0 = S_TABLE / 2
    y0 = 0
    x0_1 = 0
    y0_1 = -1 * (l1 - S_TABLE / 2 + l)
    x0_2 = S_TABLE
    y0_2 = -1 * (l2 - S_TABLE / 2 + l)

    a1 = (g * (m2 - m1 - k * m)) / (m + m2 + m1)
    a2 = None
    a3 = None
    a4 = None
    if a1 < 0 or m2 == m1:
        return {
            'result_text': "В начальном положении",
            'y1': y0_1,
            'x1': x0_1,
            'y2': y0_2,
            'x2': x0_2,
            'x': x0,
            'y': y0,
        }

    # 2 страница решения
    # TODO: if l1 + l < S_TABLE, добавить возможность задавать длины нитей, стола и т.д.
    if True:
        # легкое тело окажется в (0, 0) через
        t1 = math.sqrt(2 * (l1 - S_TABLE / 2 + l) / abs(a1))
        # До истечения t1
        if t <= t1:
            # тело проедет не t1 секунд, а за остаток от заданого t
            t1 = t
            y1 = y0_1 + a1 * t1 ** 2 / 2
            x1 = x0_1 = 0
            y2 = y0_2 - a1 * t1 ** 2 / 2
            x2 = x0_2 = S_TABLE
            y = y0 = 0
            x = x0 + a1 * t1 ** 2 / 2

            result_text = 'Меньшее тело остановится до блока'
        else:
            # После истечения t1
            # 3 страница решения
            a2 = (m2 * g - k * g * (m1 + m)) / (m + m1 + m2)
            t2 = _calculate_t2(S_TABLE=S_TABLE, l1=l1, l=l, a1=a1, a2=a2, t1=t1)
            # До истечения t2
            if t - t1 - t2 < 0:
                # тело проедет не t2 секунд, а за остаток от заданого t
                # 4 страница решения
                t2 = t - t1
                y1 = 0
                x1 = a1 * t1 + a2 * t2 ** 2
                y2 = -a1 * t1 + S_TABLE - 2 * l - l2 - l1 - (a2 * t2 ** 2) / 2
                x2 = S_TABLE
                y = 0
                x = l1 + l + a1 * t1 + (a2 * t2 ** 2) / 2

                result_text = 'Меньшее тело остановится после блока, но до следующего блока'
            else:
                # После истечения t2
                # 5 страница решения
                a3 = g * (m2 + m - k * m1) / (m1+m2+m)

                t3 = _calculate_t3(l1=l1, l=l, a1=a1, a2=a2, a3=a3, t1=t1, t2=t2)
                if t - t1 - t2 - t3 < 0:
                    # До истечения t1
                    t3 = t - t1 - t2
                    y1 = 0
                    x1 = (a1*t1 + a2*t2) * t3 + S_TABLE - l1 - l + a3*t3**2/2
                    y2 = (-l2 - l) - (a1*t1 + a2*t2) * t3 - a3*t3**2/2
                    x2 = S_TABLE
                    y = -(a1*t1 + a2*t2) * t3 - a3*t3**2/2
                    x = S_TABLE
                    result_text = 'Одно тело останется на столе, двое повиснут'
                else:
                    # все тела летят вниз, a4 = g = 9,8
                    a4 = g * (m + m1 + m2) / (m + m1 + m2)

                    y1 = 0
                    x1 = S_TABLE
                    y2 = -l2 - l1 - S_TABLE
                    x2 = S_TABLE
                    y = l1 + l - 2 * S_TABLE
                    x = S_TABLE
                    result_text = 'Тяжелое тело унесёт два других'

    if reversed_masses:
        m1, m2 = m2, m1
        y1, y2 = y2, y1
        x1, x2 = x2, x1
        x = 60 - x
        # "y" менять не нужно, т.к. все случаи зеркальны по y оси

    return {
        'result_text': result_text,
        'y1': y1,
        'x1': x1,
        'y2': y2,
        'x2': x2,
        'x': x,
        'y': y,
        'a1': a1,
        'a2': a2,
        'a3': a3,
        'a4': a4,
        't1': t1,
        't2': t2,
        't3': t3,
        't': t,
        'm1': m1,
        'm2': m2,
        'm': m
    }


def _calculate_t2(S_TABLE, l1, l, a1, a2, t1) -> float:
    """
    Формула: (a2 * t2^2 / 2) + a1 * t1 * t2 - S_TABLE + l + l1
    Квадратное уравнение вида: at^2 + bt + c = 0
    """
    a = a2 / 2
    b = a1 * t1
    c = -S_TABLE + l + l1

    discr = b ** 2 - 4 * a * c

    t2 = None
    if discr > 0:
        t1 = (-b + math.sqrt(discr)) / (2 * a)
        t2 = (-b - math.sqrt(discr)) / (2 * a)
        t2 = max(t1, t2)
    elif discr == 0:
        t2 = -b / (2 * a)
    else:
        print("Корней нет")
    return t2


def _calculate_t3(l1, l, a1, a2, a3, t1, t2) -> float:
    """
    Формула: (a3 * t3^2 / 2) + t3 * (a1*t1 + a2*t2) - l - l1
    Квадратное уравнение вида: at^2 + bt + c = 0
    """
    a = a3 / 2
    b = a1*t1 + a2*t2
    c = -l - l1

    discr = b ** 2 - 4 * a * c

    t3 = None
    if discr > 0:
        t1 = (-b + math.sqrt(discr)) / (2 * a)
        t2 = (-b - math.sqrt(discr)) / (2 * a)

        t3 = max(t1, t2)
    elif discr == 0:
        t2 = -b / (2 * a)
        t3 = t2
    else:
        print("Корней нет")
    return t3
